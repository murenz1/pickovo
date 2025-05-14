// IMPORTANT: This file must be imported before any other Firebase imports

import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx9BTE26x9DnAZMbToxMvDzB3I0Ucl-7U",
  authDomain: "pickovo-bd.firebaseapp.com",
  projectId: "pickovo-bd",
  storageBucket: "pickovo-bd.appspot.com",
  messagingSenderId: "902534536375",
  appId: "1:902534536375:web:c8263d6aac3ca490e5c132",
  measurementId: "G-8DCFN561HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
// IMPORTANT: This specific pattern is required for React Native
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log('Firebase Auth initialized with AsyncStorage persistence');
} catch (error) {
  // If auth has already been initialized, this will catch the error
  // and just use the existing auth instance
  console.log('Using existing auth instance:', error.message);
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Functions
const functions = getFunctions(app);

console.log('Firebase services initialized successfully');

// Export the initialized services
export { app, auth, db, functions };
