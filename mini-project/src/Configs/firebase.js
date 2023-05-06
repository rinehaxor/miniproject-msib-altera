import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC6VTdlmgYuh4CZCaY4c9ZO92bodmbmBHY',
  authDomain: 'movie-note-e00b0.firebaseapp.com',
  projectId: 'movie-note-e00b0',
  storageBucket: 'movie-note-e00b0.appspot.com',
  messagingSenderId: '553650704629',
  appId: '1:553650704629:web:f329abbc6b251978a4b5bc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
