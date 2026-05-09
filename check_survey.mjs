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

const snap = await getDoc(doc(db, 'surveys', 'llkASAIPipUXDeTQx9Ov'));
if(snap.exists()){
  const d = snap.data();
  console.log("Status:", d.status);
  console.log("Keys:", Object.keys(d));
  console.log("Items count:", d.items?.length || 'no items');
  console.log("Questions count:", d.questions?.length || 'no questions');
  console.log("First item:", JSON.stringify(d.items?.[0] || d.questions?.[0], null, 2));
} else {
  console.log("NOT FOUND");
}
process.exit(0);
