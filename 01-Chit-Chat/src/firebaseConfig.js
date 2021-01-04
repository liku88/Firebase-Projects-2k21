import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8D8g2y9d1V1aa-z71z7d4u9Pm6UxhlTc",
    authDomain: "iterians-chit-chat.firebaseapp.com",
    projectId: "iterians-chit-chat",
    storageBucket: "iterians-chit-chat.appspot.com",
    messagingSenderId: "597789655159",
    appId: "1:597789655159:web:9473fcc4ac7f93a189c672",
    measurementId: "G-XR40LL1SF1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;