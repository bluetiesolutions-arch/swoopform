import { initializeApp } from 'firebase/app';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';

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

async function fix() {
  for (const id of ids) {
    await updateDoc(doc(db, 'assessments', id), {
      userId: "7WPJK6ZuaEb3lgevyUbbU87umuH3"
    });
    console.log("✅ Updated:", id);
  }
  console.log("All done!");
  process.exit(0);
}

fix().catch(e => { console.error(e); process.exit(1); });
