import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOOBrkD3YjiciEwZh7h17hFXk2bEl39S0",
  authDomain: "b-2-c-mobile-template.firebaseapp.com",
  projectId: "b-2-c-mobile-template",
  storageBucket: "b-2-c-mobile-template.firebasestorage.app",
  messagingSenderId: "261392485070",
  appId: "1:261392485070:web:8169b591f60387cc891e9f",
  measurementId: "G-QKBNTP7RRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default app; 