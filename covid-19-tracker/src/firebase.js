import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, EmailAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import * as firebaseui from 'firebaseui';

export function firebase() {
    const startSignUpButton = document.getElementById('startSignUp');
    const startLogInButton = document.getElementById('startLogIn');

    // Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyCpspyJBziegUr-XlHfRRiEol1qKqLSzP0",
        authDomain: "okab-6a8ac.firebaseapp.com",
        projectId: "okab-6a8ac",
        storageBucket: "okab-6a8ac.appspot.com",
        messagingSenderId: "935513642014",
        appId: "1:935513642014:web:457bcd1dd20bc60caaca0f",
        measurementId: "G-8978S7Z8XF"
    };

    // Initialize app, db, and auth
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    let auth = getAuth();

    // Function to sign up new users // May not actually use
    // createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed in 
    //         const user = userCredential.user;
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ..
    //     });

    // FirebaseUI config // TODO: Get FirebaseUI working, along with the button clicks (open window with input fields)
    const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
        // Email / Password Provider.
        EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // Handle sign-in.
            // Return false to avoid redirect.
            return false;
        },
        },
    };

    // Initialize the FirebaseUI widget using Firebase
    const ui = new firebaseui.auth.AuthUI(auth);

    // Listen to Sign Up button clicks
    startSignUpButton.addEventListener("click",
    () => {
            ui.start("#firebaseui-auth-container", uiConfig);
    });

    // Listen to Log In button clicks
    startLogInButton.addEventListener("click",
    () => {
            ui.start("#firebaseui-auth-container", uiConfig);
    });
}