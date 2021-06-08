import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCNe1gpBM4oqk_jD_FA5_3ZJU4cv1oSZM8",
    authDomain: "cloneamazn-908d1.firebaseapp.com",
    projectId: "cloneamazn-908d1",
    storageBucket: "cloneamazn-908d1.appspot.com",
    messagingSenderId: "694838051185",
    appId: "1:694838051185:web:5f871f84483d22e7f7f6d0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }