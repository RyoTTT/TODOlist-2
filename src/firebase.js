
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAlnSx2v6_pHsRHc9MqLsdN94vlTpjnxg",
  authDomain: "todolist-2-6aed6.firebaseapp.com",
  projectId: "todolist-2-6aed6",
  storageBucket: "todolist-2-6aed6.appspot.com",
  messagingSenderId: "768495513446",
  appId: "1:768495513446:web:92c4c10731ceb6975222a7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth , provider}