const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer with your Gmail credentials
// For production, use environment variables for these values
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail address
    pass: 'your-app-password' // Replace with your Gmail app password (not your regular password)
  }
});

// Cloud function to send verification code
exports.sendVerificationCode = functions.https.onCall(async (data, context) => {
  const { email } = data;
  
  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required');
  }
  
  try {
    // Generate a random 5-digit code
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    
    // Store the code in Firestore with expiration time (1 hour from now)
    const expiresAt = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 60 * 60 * 1000)
    );
    
    await admin.firestore().collection('verificationCodes').doc(email).set({
      code,
      expiresAt,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Send the email
    const mailOptions = {
      from: 'Pickovo <your-email@gmail.com>', // Replace with your Gmail address
      to: email,
      subject: 'Your Pickovo Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verify Your Email</h2>
          <p>Thank you for signing up with Pickovo. To complete your registration, please use the verification code below:</p>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 1 hour.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <p>Best regards,<br>The Pickovo Team</p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send verification email');
  }
});

// Cloud function to verify code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  const { email, code } = data;
  
  if (!email || !code) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and code are required');
  }
  
  try {
    // Get the stored verification code
    const docRef = admin.firestore().collection('verificationCodes').doc(email);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      throw new functions.https.HttpsError('not-found', 'Verification code not found');
    }
    
    const { code: storedCode, expiresAt } = doc.data();
    
    // Check if code has expired
    if (expiresAt.toDate() < new Date()) {
      await docRef.delete(); // Clean up expired code
      throw new functions.https.HttpsError('deadline-exceeded', 'Verification code has expired');
    }
    
    // Check if codes match
    if (storedCode !== code) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid verification code');
    }
    
    // Delete the used code
    await docRef.delete();
    
    return { success: true };
  } catch (error) {
    console.error('Error verifying code:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to verify code');
  }
});
