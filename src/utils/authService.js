// MOCK AUTH SERVICE - Replace with real Firebase implementation once installed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, functions } from './firebaseInit';

// User registration with email and password
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    console.log(`[MOCK] Registering user with email: ${email}`);
    
    // Create a mock user object
    const mockUser = createMockUser(email);
    
    // Store in AsyncStorage for persistence across app restarts
    await AsyncStorage.setItem('mockCurrentUser', JSON.stringify(mockUser));
    
    // Update the auth object's currentUser
    auth.currentUser = mockUser;
    
    return mockUser;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Update user profile (name, photo)
export const updateUserProfile = async (displayName, photoURL = null) => {
  try {
    console.log(`[MOCK] Updating profile: ${displayName}, ${photoURL}`);
    
    // Get the current mock user
    const mockUser = auth.currentUser;
    if (!mockUser) {
      throw new Error('No user is signed in');
    }
    
    // Update the mock user
    mockUser.displayName = displayName;
    if (photoURL) mockUser.photoURL = photoURL;
    
    // Store the updated user
    await AsyncStorage.setItem('mockCurrentUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    
    return mockUser;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    console.log(`[MOCK] Signing in user with email: ${email}`);
    
    // Create a mock user
    const mockUser = createMockUser(email);
    
    // Store the user
    await AsyncStorage.setItem('mockCurrentUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    
    return mockUser;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

// Sign out user
export const logoutUser = async () => {
  try {
    console.log('[MOCK] Signing out user');
    
    // Clear the stored user
    await AsyncStorage.removeItem('mockCurrentUser');
    auth.currentUser = null;
    
    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    console.log(`[MOCK] Sending password reset email to: ${email}`);
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
    console.log('[MOCK] Signing in with Google');
    
    // Create a mock user with a Google provider
    const mockUser = createMockUser('google.user@gmail.com');
    mockUser.providerData = [{ providerId: 'google.com' }];
    
    // Store the user
    await AsyncStorage.setItem('mockCurrentUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    
    return mockUser;
  } catch (error) {
    throw error;
  }
};

// Sign in with Facebook
export const signInWithFacebook = async (accessToken) => {
  try {
    console.log('[MOCK] Signing in with Facebook');
    
    // Create a mock user with a Facebook provider
    const mockUser = createMockUser('facebook.user@example.com');
    mockUser.providerData = [{ providerId: 'facebook.com' }];
    
    // Store the user
    await AsyncStorage.setItem('mockCurrentUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    
    return mockUser;
  } catch (error) {
    throw error;
  }
};

// Sign in with Apple
export const signInWithApple = async (idToken, nonce) => {
  try {
    console.log('[MOCK] Signing in with Apple');
    
    // Create a mock user with an Apple provider
    const mockUser = createMockUser('apple.user@privaterelay.appleid.com');
    mockUser.providerData = [{ providerId: 'apple.com' }];
    
    // Store the user
    await AsyncStorage.setItem('mockCurrentUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    
    return mockUser;
  } catch (error) {
    throw error;
  }
};

// Auth state listener
export const onAuthStateChanged = (callback) => {
  // Check AsyncStorage for a stored user
  AsyncStorage.getItem('mockCurrentUser')
    .then(jsonUser => {
      if (jsonUser) {
        auth.currentUser = JSON.parse(jsonUser);
        callback(auth.currentUser);
      } else {
        auth.currentUser = null;
        callback(null);
      }
    })
    .catch(err => {
      console.error('[MOCK] Error getting stored user:', err);
      callback(null);
    });
  
  // Return a fake unsubscribe function
  return () => {};
};

// Send email verification code
export const sendEmailVerificationCode = async (email) => {
  try {
    console.log(`[MOCK] Sending verification code to: ${email}`);
    
    // Generate a random 5-digit code
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    
    console.log(`Verification code for ${email}: ${code}`);
    // Alert the user with the code
    alert(`Your verification code is: ${code}`);
    
    // Store the code in AsyncStorage
    await AsyncStorage.setItem(`verificationCode_${email}`, code);
    
    return true;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

// Verify email verification code
export const verifyEmailCode = async (email, code) => {
  try {
    console.log(`[MOCK] Verifying code for: ${email}`);
    
    // Check if the code is 5 digits
    if (code.length !== 5 || !/^\d+$/.test(code)) {
      throw new Error('Invalid verification code format');
    }
    
    // Get the stored code from AsyncStorage
    const storedCode = await AsyncStorage.getItem(`verificationCode_${email}`);
    
    // Check if the entered code matches the stored code
    if (storedCode && storedCode === code) {
      // Clear the stored code after successful verification
      await AsyncStorage.removeItem(`verificationCode_${email}`);
      
      // Update the mock user as verified
      if (auth.currentUser) {
        auth.currentUser.emailVerified = true;
        await AsyncStorage.setItem('mockCurrentUser', JSON.stringify(auth.currentUser));
      }
      
      return true;
    } else {
      throw new Error('Invalid verification code');
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
};

// Helper function to create a mock user
function createMockUser(email) {
  const uid = Math.random().toString(36).substring(2, 15);
  
  return {
    uid,
    email,
    emailVerified: false,
    displayName: '',
    photoURL: null,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString()
    },
    providerData: [{ providerId: 'password' }],
    // Add a mock getIdToken method
    getIdToken: () => Promise.resolve(`mock-token-${uid}`)
  };
}
