import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDHTpvhidwe9L-79nCQd5y5sHA1AJo2Gk8',
  authDomain: 'encre-et-ombre.firebaseapp.com',
  projectId: 'encre-et-ombre',
  storageBucket: 'encre-et-ombre.firebasestorage.app',
  messagingSenderId: '120956285394',
  appId: '1:120956285394:web:1cda874aa0e26454e1580b',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
