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
import { auth } from './firebase';

// User registration with email and password
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send email verification
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Update user profile (name, photo)
export const updateUserProfile = async (displayName, photoURL = null) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName,
        photoURL
      });
      return user;
    }
    throw new Error('No user is signed in');
  } catch (error) {
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign out user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
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
