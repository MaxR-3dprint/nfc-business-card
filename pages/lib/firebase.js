import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.AIzaSyDSAe-nOV_yJeFcsUYLaAcPYbMGgVOo_F4,
  authDomain: process.env.nfc-business-card-d4008.firebaseapp.com,
  projectId: process.env.nfc-business-card-d4008,
  storageBucket: process.env.nfc-business-card-d4008.firebasestorage.app,
  messagingSenderId: process.env.449358567490,
  appId: process.env.1:449358567490:web:129edefee24b74c05775db
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
