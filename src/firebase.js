import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDH9tLqufyKB-DB8Z29BtHCeKL59NOmgdg',
  authDomain: 'lucilaapp-20b73.firebaseapp.com',
  projectId: 'lucilaapp-20b73',
  storageBucket: 'lucilaapp-20b73.appspot.com',
  messagingSenderId: '863295723362',
  appId: '1:863295723362:web:00180d5168806eef9a7e3b',
  measurementId: 'G-0C4VQ9PR30',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
