// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCutwfdE45BXhP9INj6xWjIWi9UQ1MDt3c',
	authDomain: 'react-cursos-9b9d0.firebaseapp.com',
	projectId: 'react-cursos-9b9d0',
	storageBucket: 'react-cursos-9b9d0.appspot.com',
	messagingSenderId: '71055651395',
	appId: '1:71055651395:web:59310df76736cc262b5af6',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
