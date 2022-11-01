import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// });

const app = initializeApp({
  // apiKey: "AIzaSyB9bKU-RBaoXgvYDImr62gw8HXrUvqmQcU",
  // authDomain: "election-dapp.firebaseapp.com",
  // projectId: "election-dapp",
  // storageBucket: "election-dapp.appspot.com",
  // messagingSenderId: "840674001294",
  // appId: "1:840674001294:web:7dbe7d950563363a76e4df",
  apiKey: "AIzaSyAvlgAbHjQTSvcCOpTG_O57nu_4glYqrck",
  authDomain: "dapp-9ec90.firebaseapp.com",
  projectId: "dapp-9ec90",
  storageBucket: "dapp-9ec90.appspot.com",
  messagingSenderId: "1026388052277",
  appId: "1:1026388052277:web:c6d48b815b0f4ab350247c",
  measurementId: "G-JCQPH58T3L"
});

export const auth = getAuth();
const db = getFirestore(app);
export default db;
