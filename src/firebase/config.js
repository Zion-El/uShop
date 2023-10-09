// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCgzLObHJEhQPJfrkYVbmq2bBp0HXse16E",
  authDomain: "ushop-51c21.firebaseapp.com",
  projectId: "ushop-51c21",
  storageBucket: "ushop-51c21.appspot.com",
  messagingSenderId: "926541271395",
  appId: "1:926541271395:web:8cdd49867311b640380356"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app