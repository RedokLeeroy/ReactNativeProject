import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaMO54LRHNHYOb4glNZTho0athpvmOF60",
  authDomain: "react-native-proj-60994.firebaseapp.com",
  projectId: "react-native-proj-60994",
  storageBucket: "react-native-proj-60994.appspot.com",
  messagingSenderId: "853752267289",
  appId: "1:853752267289:web:eedb44e496e85cddf52088",
  measurementId: "G-JTH6WJBRCS",
};
const db = firebase.initializeApp(firebaseConfig);

export default db;
