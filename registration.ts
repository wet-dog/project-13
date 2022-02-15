import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signInWithCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseApp } from './firebase';

const auth = getAuth(firebaseApp);

// Listen for authentication state to change.
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('We are authenticated now!');
        const uid = user.uid;
        console.log(uid);
    }

    // Do other things
});

export async function signUp(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return true;
    } catch (err: any) {
        const errorCode = err.code;
        const errorMessage = err.message;
        return false;
    }
}

export async function signIn(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return true;
    } catch (err: any) {
        const errorCode = err.code;
        const errorMessage = err.message;
        return false;
    }
}
