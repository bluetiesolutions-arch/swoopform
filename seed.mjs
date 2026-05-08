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

const assessments = [
  {
    title: "Python Basics Assessment",
    description: "Test your knowledge of Python fundamentals.",
    subject: "Python Programming",
    difficulty: "Beginner",
    timeLimit: 15,
    maxAttempts: "3",
    instructions: "Read each question carefully. No negative marking.",
    passPct: 60,
    defaultMarks: 1,
    negativeMarking: false,
    negativeMarks: 0,
    shuffleQuestions: false,
    shuffleOptions: true,
    showAnswers: true,
    showScore: true,
    collectInfo: true,
    accepting: true,
    passMessage: "Congratulations! You passed!",
    failMessage: "Keep practicing and try again!",
    resultBtnText: "View Results",
    resultDelay: "0",
    totalMarks: 9,
    formType: "assessment",
    status: "active",
    grades: [
      {from:90,grade:"A+",message:"Outstanding!"},
      {from:75,grade:"A",message:"Excellent!"},
      {from:60,grade:"B",message:"Good job!"},
      {from:40,grade:"C",message:"Keep practicing!"},
      {from:0,grade:"F",message:"Better luck next time!"}
    ],
    questions: [
      {type:"mcq",text:"What is the correct way to create a variable in Python?",marks:1,explanation:"Python uses dynamic typing - just assign a value directly.",options:[{text:"int x = 5",correct:false},{text:"x = 5",correct:true},{text:"var x = 5",correct:false},{text:"let x = 5",correct:false}],correctAnswer:""},
      {type:"mcq",text:"Which keyword is used to define a function in Python?",marks:1,explanation:"The 'def' keyword defines functions in Python.",options:[{text:"function",correct:false},{text:"func",correct:false},{text:"def",correct:true},{text:"define",correct:false}],correctAnswer:""},
      {type:"truefalse",text:"Python is a compiled language.",marks:1,explanation:"Python is interpreted, not compiled.",options:[],correctAnswer:"False"},
      {type:"mcq",text:"What does len() do in Python?",marks:1,explanation:"len() returns the number of items in an object.",options:[{text:"Returns largest element",correct:false},{text:"Returns length of object",correct:true},{text:"Converts to string",correct:false},{text:"None of above",correct:false}],correctAnswer:""},
      {type:"multi",text:"Which are valid Python data types? (Select all)",marks:2,explanation:"Python has int, str, list, dict and more.",options:[{text:"int",correct:true},{text:"str",correct:true},{text:"char",correct:false},{text:"list",correct:true},{text:"array",correct:false}],correctAnswer:""},
      {type:"fillblank",text:"The keyword to create a class in Python is ___",marks:1,explanation:"The 'class' keyword defines a class.",options:[],correctAnswer:"class"},
      {type:"number",text:"What is the output of len('SwoopForm')?",marks:1,explanation:"SwoopForm has 9 characters.",options:[],correctAnswer:"9"},
      {type:"truefalse",text:"Python supports object-oriented programming.",marks:1,explanation:"Yes, Python fully supports OOP.",options:[],correctAnswer:"True"}
    ]
  },
  {
    title: "General Knowledge Quiz",
    description: "Test your general knowledge across science, history and geography.",
    subject: "General Knowledge",
    difficulty: "Intermediate",
    timeLimit: 10,
    maxAttempts: "unlimited",
    instructions: "Answer all questions. Negative marking applies!",
    passPct: 50,
    defaultMarks: 1,
    negativeMarking: true,
    negativeMarks: 0.25,
    shuffleQuestions: true,
    shuffleOptions: true,
    showAnswers: true,
    showScore: true,
    collectInfo: true,
    accepting: true,
    passMessage: "Well done! Great general knowledge!",
    failMessage: "Keep reading and learning. Try again!",
    resultBtnText: "See Results",
    resultDelay: "0",
    totalMarks: 8,
    formType: "assessment",
    status: "active",
    grades: [
      {from:85,grade:"A+",message:"Genius level!"},
      {from:70,grade:"A",message:"Excellent!"},
      {from:55,grade:"B",message:"Good!"},
      {from:40,grade:"C",message:"Average"},
      {from:0,grade:"F",message:"Need more reading!"}
    ],
    questions: [
      {type:"mcq",text:"What is the capital of Australia?",marks:1,explanation:"Canberra is the capital, not Sydney.",options:[{text:"Sydney",correct:false},{text:"Melbourne",correct:false},{text:"Canberra",correct:true},{text:"Brisbane",correct:false}],correctAnswer:""},
      {type:"mcq",text:"Which planet is known as the Red Planet?",marks:1,explanation:"Mars appears red due to iron oxide.",options:[{text:"Venus",correct:false},{text:"Mars",correct:true},{text:"Jupiter",correct:false},{text:"Saturn",correct:false}],correctAnswer:""},
      {type:"truefalse",text:"The Great Wall of China is visible from space with naked eye.",marks:1,explanation:"This is a myth. It is NOT visible from space.",options:[],correctAnswer:"False"},
      {type:"mcq",text:"Who painted the Mona Lisa?",marks:1,explanation:"Leonardo da Vinci painted it between 1503-1519.",options:[{text:"Michelangelo",correct:false},{text:"Picasso",correct:false},{text:"Leonardo da Vinci",correct:true},{text:"Raphael",correct:false}],correctAnswer:""},
      {type:"number",text:"How many continents are there on Earth?",marks:1,explanation:"7 continents: Asia, Africa, North America, South America, Antarctica, Europe, Australia.",options:[],correctAnswer:"7"},
      {type:"mcq",text:"Which is the largest ocean on Earth?",marks:1,explanation:"The Pacific Ocean is the largest.",options:[{text:"Atlantic",correct:false},{text:"Indian",correct:false},{text:"Arctic",correct:false},{text:"Pacific",correct:true}],correctAnswer:""},
      {type:"truefalse",text:"India is the most populous country in the world as of 2024.",marks:1,explanation:"India surpassed China in 2023.",options:[],correctAnswer:"True"},
      {type:"mcq",text:"What is the chemical symbol for Gold?",marks:1,explanation:"Au comes from Latin 'Aurum' meaning gold.",options:[{text:"Go",correct:false},{text:"Gd",correct:false},{text:"Au",correct:true},{text:"Ag",correct:false}],correctAnswer:""}
    ]
  },
  {
    title: "Web Development Fundamentals",
    description: "Assess your understanding of HTML, CSS and JavaScript basics.",
    subject: "Web Development",
    difficulty: "Beginner",
    timeLimit: 20,
    maxAttempts: "2",
    instructions: "Covers HTML, CSS and JavaScript. Read carefully before answering.",
    passPct: 65,
    defaultMarks: 1,
    negativeMarking: false,
    negativeMarks: 0,
    shuffleQuestions: false,
    shuffleOptions: false,
    showAnswers: true,
    showScore: true,
    collectInfo: true,
    accepting: true,
    passMessage: "Great job! You are ready to build websites!",
    failMessage: "Review HTML CSS JS basics and try again!",
    resultBtnText: "View Answers",
    resultDelay: "0",
    totalMarks: 8,
    formType: "assessment",
    status: "active",
    grades: [
      {from:90,grade:"A+",message:"Web dev pro!"},
      {from:75,grade:"A",message:"Excellent!"},
      {from:65,grade:"B",message:"Good understanding!"},
      {from:50,grade:"C",message:"Basic knowledge"},
      {from:0,grade:"F",message:"Keep learning!"}
    ],
    questions: [
      {type:"mcq",text:"What does HTML stand for?",marks:1,explanation:"HTML stands for HyperText Markup Language.",options:[{text:"Hyper Text Markup Language",correct:true},{text:"High Tech Modern Language",correct:false},{text:"Hyper Transfer Markup Language",correct:false},{text:"Home Tool Markup Language",correct:false}],correctAnswer:""},
      {type:"mcq",text:"Which HTML tag creates a hyperlink?",marks:1,explanation:"The anchor tag <a> creates hyperlinks.",options:[{text:"<link>",correct:false},{text:"<href>",correct:false},{text:"<a>",correct:true},{text:"<url>",correct:false}],correctAnswer:""},
      {type:"mcq",text:"Which CSS property changes text color?",marks:1,explanation:"The 'color' property sets text color.",options:[{text:"text-color",correct:false},{text:"font-color",correct:false},{text:"color",correct:true},{text:"text-style",correct:false}],correctAnswer:""},
      {type:"truefalse",text:"CSS stands for Cascading Style Sheets.",marks:1,explanation:"Yes, CSS stands for Cascading Style Sheets.",options:[],correctAnswer:"True"},
      {type:"mcq",text:"Which JavaScript method prints to the console?",marks:1,explanation:"console.log() prints to browser console.",options:[{text:"console.print()",correct:false},{text:"console.log()",correct:true},{text:"print()",correct:false},{text:"log()",correct:false}],correctAnswer:""},
      {type:"fillblank",text:"The ___ attribute specifies the URL of a hyperlink.",marks:1,explanation:"The href attribute specifies the link destination.",options:[],correctAnswer:"href"},
      {type:"multi",text:"Valid ways to include CSS in HTML? (Select all)",marks:2,explanation:"CSS can be inline, internal or external.",options:[{text:"Inline style attribute",correct:true},{text:"Internal <style> tag",correct:true},{text:"External <link> tag",correct:true},{text:"Using <css> tag",correct:false}],correctAnswer:""}
    ]
  }
];

async function seed() {
  console.log("Seeding 3 assessments...");
  for (const a of assessments) {
    const ref = await addDoc(collection(db, 'assessments'), {
      ...a,
      userId: "seed-user",
      responseCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("✅ Created:", a.title, "→ ID:", ref.id);
  }
  console.log("\nDone! Visit:");
  console.log("swoopform.com/assessment/?id=<ID above>");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
