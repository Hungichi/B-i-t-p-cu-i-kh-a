
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-lite.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4IyXkWVRlyVwm-OcY4u_k7BcjSJ5CHdo",
  authDomain: "signin-259d0.firebaseapp.com",
  databaseURL: "https://signin-259d0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signin-259d0",
  storageBucket: "signin-259d0.appspot.com",
  messagingSenderId: "1033538470064",
  appId: "1:1033538470064:web:1c56b29af242de170ebb75",
  measurementId: "G-NWB8P08TFT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const getData = async (db) => {
  const querySnapshot = await getDocs(collection(db, "ticket"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}
//delete data from colection
const deleteDataById = async (db, id) => {
  // const querySnapshot = await getDocs(collection(db, "ticket"));
  await deleteDoc(doc(db, "ticket", id));
}

//create data from collection
const createData = async (db,) => {
  try {
    const docRef = await addDoc(collection(db, "ticket"), {
      name: "Anantara Uluwatu Bali Resort",
      price: 175,
      avaUrl: "./pic",
      description: ""
    });
    console.log("Document written with ID : ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

await getData(db).then(rs => rs);
// await deleteDataById(db , "GnD4GhX171jAwCTIwp4S");
