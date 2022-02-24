import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAeTpF6PA1D3xErAdr1GK_4eDqZp2LEvaM',
  authDomain: 'project-13-8e03f.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-13-8e03f',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
