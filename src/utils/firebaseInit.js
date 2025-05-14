// TEMPORARY MOCK FIREBASE IMPLEMENTATION
// Replace with real Firebase once network issues are resolved

import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('Using MOCK Firebase implementation');

// Create mock Firebase objects
const app = {
  name: 'mock-app',
  options: {
    apiKey: "AIzaSyDx9BTE26x9DnAZMbToxMvDzB3I0Ucl-7U",
    projectId: "pickovo-bd"
  }
};

// Mock auth with basic functionality
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    // Return unsubscribe function
    callback(null);
    return () => {};
  },
  signOut: async () => {
    auth.currentUser = null;
    return Promise.resolve();
  }
};

// Mock firestore
const db = {
  collection: (name) => ({
    doc: (id) => ({
      get: () => Promise.resolve({
        exists: false,
        data: () => null
      }),
      set: (data) => Promise.resolve()
    })
  })
};

// Mock functions
const functions = {
  httpsCallable: (name) => {
    return (data) => Promise.resolve({ data: { success: true } });
  }
};

console.log('Mock Firebase services initialized successfully');

export { app, auth, db, functions };
