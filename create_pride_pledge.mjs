import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

const campaign = {
  title: "We Stand With Pride 🏳️‍🌈",
  status: "active",
  formType: "pledge",
  heroSubtitle: "This Pride Month, we pledge to stand beside the LGBTQ+ community — with love, respect, and unwavering support.",
  heroCTA: "Add My Voice →",
  heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
  heroVideo: "",
  color: "#7c3aed",
  statementTitle: "Our Pledge",
  statement: "I pledge to stand with the LGBTQ+ community — not just in June, but every single day. I commit to listening, learning, and speaking up against discrimination. I believe love is love, and every person deserves to live freely and authentically without fear, shame, or judgment.",
  problem: {
    title: "Why Pride Matters",
    content: "Pride is not just a celebration — it is a reminder that millions of LGBTQ+ people around the world still face discrimination, violence, and inequality every day. In many countries, being who you are is still illegal. Your pledge is a statement that you stand on the right side of history. Together, we create the world we want to live in.",
    image: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?w=1200&q=80"
  },
  formTitle: "Add Your Voice",
  formSubtitle: "Join thousands of allies standing with the LGBTQ+ community this Pride Month and beyond.",
  fields: {
    name: true,
    email: true,
    phone: false,
    city: true,
    org: true,
    message: true,
    twitter: true,
    linkedin: true,
    custom: false,
    customLabel: ""
  },
  showCounter: true,
  showProgress: true,
  goal: 1000,
  stats: [
    { value: "70+", label: "Countries where being LGBTQ+ is still criminalised" },
    { value: "1 in 3", label: "LGBTQ+ people face workplace discrimination" },
    { value: "100%", label: "Of our commitment to stand with them" }
  ],
  milestones: [
    { count: 100, label: "🌈 100 Voices Strong!" },
    { count: 500, label: "🏳️‍🌈 500 Allies United!" },
    { count: 1000, label: "🎉 1,000 Standing With Pride!" },
    { count: 5000, label: "🌍 5,000 — Love Wins!" }
  ],
  faqs: [
    {
      question: "Is this pledge legally binding?",
      answer: "No — this is a public declaration of your values and support for the LGBTQ+ community."
    },
    {
      question: "Will my name be visible publicly?",
      answer: "Yes, your name will appear on the supporters wall to show solidarity with the community."
    },
    {
      question: "How does this help the community?",
      answer: "Every signature sends a powerful message that allies exist everywhere. It helps LGBTQ+ individuals feel seen, supported, and less alone."
    },
    {
      question: "Is this only for Pride Month?",
      answer: "Absolutely not. Our commitment is year-round. Pride Month is just when we amplify our voices together."
    }
  ],
  supporters: {
    showNames: true,
    showMessages: true,
    showCities: true,
    showOrgs: true
  },
  thankYou: {
    heading: "Thank you for standing with Pride! 🏳️‍🌈",
    message: "Your voice matters. Share this campaign to inspire more allies to stand up. Together we are louder.",
    shareText: "Share the love 🏳️‍🌈",
    nextBtn: "Learn More",
    nextUrl: "unfe.org/un-free-equal"
  },
  category: "Community",
  isPublic: true,
  allowShare: true,
  showProblem: true,
  accepting: true,
  requireAgree: true,
  slug: "we-stand-with-pride",
  seo: {
    title: "We Stand With Pride 🏳️‍🌈 — SwoopForm",
    description: "This Pride Month, pledge to stand with the LGBTQ+ community. Add your voice and share with allies everywhere.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
  },
  userId: "7WPJK6ZuaEb3lgevyUbbU87umuH3",
  totalPledges: 0,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
};

try {
  const ref = await addDoc(collection(db, 'pledges'), campaign);
  console.log("✅ Campaign created!");
  console.log("🔗 View: https://swoopform.com/pledge/?id=" + ref.id);
  console.log("✏️  Edit: https://swoopform.com/pledge/create/?id=" + ref.id);
  console.log("📊 Responses: https://swoopform.com/pledge/responses/?id=" + ref.id);
  console.log("🌐 Slug URL: https://swoopform.com/engage/we-stand-with-pride");
} catch(e) {
  console.error("❌ Error:", e.message);
}

process.exit(0);
