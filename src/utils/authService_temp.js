// Import Firebase auth methods consistently for all platforms
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User registration with email and password
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send email verification
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);
    }
    return userCredential.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Update user profile (name, photo)
export const updateUserProfile = async (displayName, photoURL = null) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is signed in');
    }
    
    await updateProfile(user, {
      displayName,
      photoURL
    });
    
    return user;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

// Sign out user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Check if user email is verified
export const isEmailVerified = () => {
  const user = auth.currentUser;
  return user ? user.emailVerified : false;
};

// Sign in with Google
export const signInWithGoogle = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign in with Facebook
export const signInWithFacebook = async (accessToken) => {
  try {
    const credential = FacebookAuthProvider.credential(accessToken);
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign in with Apple
export const signInWithApple = async (idToken, nonce) => {
  try {
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken,
      rawNonce: nonce,
    });
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Auth state listener
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};

// Send email verification code
export const sendEmailVerificationCode = async (email) => {
  try {
    // For development/testing, we'll use both methods:
    // 1. The Cloud Function for sending real emails (when deployed)
    // 2. A local fallback for testing without deploying the function
    
    try {
      // Try to use the Cloud Function to send a real email
      const functions = getFunctions();
      const sendVerificationCodeFn = httpsCallable(functions, 'sendVerificationCode');
      await sendVerificationCodeFn({ email });
      console.log(`Verification code sent to ${email} via email`);
      return true;
    } catch (cloudFunctionError) {
      console.warn('Cloud Function not available, using local fallback:', cloudFunctionError);
      
      // Fallback to local implementation for development/testing
      // Generate a random 5-digit code
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      
      console.log(`Verification code for ${email}: ${code}`);
      // Alert the user with the code (for development purposes only)
      alert(`Your verification code is: ${code}`);
      
      // Store the code in AsyncStorage for local verification
      await AsyncStorage.setItem(`verificationCode_${email}`, code);
      
      return true;
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

// Verify email verification code
export const verifyEmailCode = async (email, code) => {
  try {
    // Check if the code is 5 digits
    if (code.length !== 5 || !/^\d+$/.test(code)) {
      throw new Error('Invalid verification code format');
    }
    
    try {
      // Try to use the Cloud Function to verify the code
      const functions = getFunctions();
      const verifyCodeFn = httpsCallable(functions, 'verifyCode');
      await verifyCodeFn({ email, code });
      return true;
    } catch (cloudFunctionError) {
      console.warn('Cloud Function not available, using local fallback:', cloudFunctionError);
      
      // Fallback to local implementation for development/testing
      // Get the stored code from AsyncStorage
      const storedCode = await AsyncStorage.getItem(`verificationCode_${email}`);
      
      // Check if the entered code matches the stored code
      if (storedCode && storedCode === code) {
        // Clear the stored code after successful verification
        await AsyncStorage.removeItem(`verificationCode_${email}`);
        return true;
      } else {
        throw new Error('Invalid verification code');
      }
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
};
