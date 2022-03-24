import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANSzZqZn3mDwsV4BJENtIiewUdi23w4Eg",
    authDomain: "moviesapp-acd48.firebaseapp.com",
    projectId: "moviesapp-acd48",
    storageBucket: "moviesapp-acd48.appspot.com",
    messagingSenderId: "670983086973",
    appId: "1:670983086973:web:949328eb75db2e7a176214"
  };


  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};