import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDM0KIE_0jMvA3XcsVmPUMBNrZpd1K-5Og",
  authDomain: "cloths-e5862.firebaseapp.com",
  projectId: "cloths-e5862",
  storageBucket: "cloths-e5862.appspot.com",
  messagingSenderId: "746104338454",
  appId: "1:746104338454:web:942bb775b6a9868d4d1d37",
  measurementId: "G-WJ7VB2YCKH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();
