import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  initializeAuth,
  getReactNativePersistence 
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
let auth;
try {
  // Try to initialize auth with persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // If it fails (possibly already initialized), use getAuth
  console.log('Auth initialization error, using getAuth instead:', error);
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
