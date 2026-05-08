import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const FB = {
  apiKey: "AIzaSyADVtdlHM72xbfOGaTlqohusO3cS8bbeS4",
  authDomain: "swoopform.firebaseapp.com",
  projectId: "swoopform",
  storageBucket: "swoopform.firebasestorage.app",
  messagingSenderId: "378850092986",
  appId: "1:378850092986:web:4fed92128136e048fa5f83"
};

const app = initializeApp(FB);
const db = getFirestore(app);

const ids = [
  "geH52tKVpIXngpnPxwHY",
  "1cHMSskRjaK9PC54K7cA",
  "kvT9UmgurDfvzOA8BJA1"
];

async function check() {
  for (const id of ids) {
    const snap = await getDoc(doc(db, 'assessments', id));
    if (snap.exists()) {
      const d = snap.data();
      console.log("ID:", id, "| userId:", d.userId, "| title:", d.title);
    } else {
      console.log("ID:", id, "NOT FOUND");
    }
  }
  process.exit(0);
}

check().catch(e => { console.error(e); process.exit(1); });
