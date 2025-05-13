import { Platform } from 'react-native';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx9BTE26x9DnAZMbToxMvDzB3I0Ucl-7U",
  authDomain: "pickovo-bd.firebaseapp.com",
  projectId: "pickovo-bd",
  storageBucket: "pickovo-bd.firebasestorage.app",
  messagingSenderId: "902534536375",
  appId: "1:902534536375:web:c8263d6aac3ca490e5c132",
  measurementId: "G-8DCFN561HJ"
};

// Initialize Firebase differently based on platform
let app, auth, db;

// For web platform
if (Platform.OS === 'web') {
  // Import web Firebase modules
  const { initializeApp } = require('firebase/app');
  const { getAuth } = require('firebase/auth');
  const { getFirestore } = require('firebase/firestore');
  
  // Initialize Firebase for web
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  console.log('Firebase initialized for web platform');
} 
// For native platforms (iOS/Android)
else {
  try {
    // Import React Native Firebase modules
    const firebaseApp = require('@react-native-firebase/app').default;
    const firebaseAuth = require('@react-native-firebase/auth').default;
    
    // Initialize Firebase for native if not already initialized
    if (!firebaseApp.apps.length) {
      app = firebaseApp.initializeApp(firebaseConfig);
      console.log('Firebase app initialized for native platform');
    } else {
      app = firebaseApp.app();
      console.log('Using existing Firebase app instance');
    }
    
    // Get auth instance
    auth = firebaseAuth();
    console.log('Firebase auth initialized for native platform');
  } catch (error) {
    console.error('Error initializing Firebase for native:', error);
    
    // Fallback to web implementation if native fails
    console.log('Falling back to web Firebase implementation');
    const { initializeApp } = require('firebase/app');
    const { getAuth } = require('firebase/auth');
    const { getFirestore } = require('firebase/firestore');
    
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
}

// If we're on native platforms and need Firestore
if (Platform.OS !== 'web' && !db) {
  try {
    const firestore = require('@react-native-firebase/firestore').default;
    db = firestore();
    console.log('Firestore initialized for native platform');
  } catch (error) {
    console.error('Error initializing Firestore for native:', error);
    // Firestore might not be available or needed on all platforms
  }
}

// Export Firebase instances
export { app, auth, db };

// Helper function to check if auth is ready
export const isAuthReady = () => {
  return !!auth;
};

// Export platform info for debugging
export const platformInfo = {
  platform: Platform.OS,
  usingNativeFirebase: Platform.OS !== 'web',
};
