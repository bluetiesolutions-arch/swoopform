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

const snap = await getDoc(doc(db, 'products', 'rNsm4h75v1Nxmznk7ZTU'));
if(snap.exists()){
  const d = snap.data();
  console.log("Title:", d.title);
  console.log("Status:", d.status);
  console.log("Questions:", d.questions?.length);
  console.log("Products:", d.products?.length);
  console.log("collectEmail:", d.collectEmail);
  console.log("First product tags:", d.products?.[0]?.tags);
  console.log("First question type:", d.questions?.[0]?.type);
} else {
  console.log("NOT FOUND");
}
process.exit(0);
