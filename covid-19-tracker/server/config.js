const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyCpspyJBziegUr-XlHfRRiEol1qKqLSzP0",
    authDomain: "okab-6a8ac.firebaseapp.com",
    projectId: "okab-6a8ac",
    storageBucket: "okab-6a8ac.appspot.com",
    messagingSenderId: "935513642014",
    appId: "1:935513642014:web:457bcd1dd20bc60caaca0f",
    measurementId: "G-8978S7Z8XF"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;