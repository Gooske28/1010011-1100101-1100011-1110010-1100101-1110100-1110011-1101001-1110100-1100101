import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Firebase configuratie
const firebaseConfig = {
    apiKey: "JOUW_API_KEY",
    authDomain: "JOUW_AUTH_DOMAIN",
    projectId: "JOUW_PROJECT_ID",
    storageBucket: "JOUW_STORAGE_BUCKET",
    messagingSenderId: "JOUW_MESSAGING_SENDER_ID",
    appId: "JOUW_APP_ID",
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registreren functie
function registerUser() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Registratie succesvol!');
            // Na succesvolle registratie, inloggen
            loginUser();
        })
        .catch((error) => {
            console.error("Fout bij registratie: ", error.message);
        });
}

// Inloggen functie
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Inloggen succesvol!');
            updateUI(userCredential.user);
        })
        .catch((error) => {
            console.error("Fout bij inloggen: ", error.message);
        });
}

// Uitloggen functie
function logoutUser() {
    signOut(auth)
        .then(() => {
            console.log('Uitloggen succesvol!');
            updateUI(null);
        })
        .catch((error) => {
            console.error("Fout bij uitloggen: ", error.message);
        });
}

// Gebruiker UI bijwerken op basis van inlogstatus
function updateUI(user) {
    if (user) {
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('logout-section').style.display = 'block';
    } else {
        document.getElementById('register-section').style.display = 'block';
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('logout-section').style.display = 'none';
    }
}

// AuthStateChanged voor automatisch verversen van de UI
onAuthStateChanged(auth, (user) => {
    updateUI(user);
});

// Start met het controleren van de status van de gebruiker bij het laden van de pagina
window.onload = () => {
    const user = auth.currentUser;
    updateUI(user);
};
