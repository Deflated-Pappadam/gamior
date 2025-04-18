// firebase/config.tsx
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEQHZChobAunp-Lmy11OCtH6nsOuMqigc",
  authDomain: "gamior-b4650.firebaseapp.com",
  projectId: "gamior-b4650",
  messagingSenderId: "511128117808",
  appId: "1:511128117808:web:e6eca06f54e675262843f5",
  measurementId: "G-ZWV41TKB01"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const db = getFirestore(app);

// Initialize Analytics but only on the client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { db, analytics };
export default app;