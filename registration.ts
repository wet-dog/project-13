import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signInWithCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseApp } from './firebase';

export const auth = getAuth(firebaseApp);

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

export type Errors = {
    email: string,
    password: string,
    confirmation?: string
}

// TODO: Add better validation
function validateEmail(email: string, errors: Errors) {
    if (email === "") {
        errors.email = "Choose an email address";
    }
    return errors;
}

function validatePassword(password: string, errors: Errors) {
    if (password.length < 8) {
        errors.password = "Use 8 characters or more for your password";
    }
    return errors;
}

function validateConfirmation(password: string, confirmation: string, errors: Errors) {
    if (password !== confirmation) {
        errors.confirmation = "Those passwords didn't match. Try again.";
    }
    return errors;
}

// Validate the sign up form
export function validateSignUp(email: string, password: string, confirmation: string) {
    let errors: Errors = {email: "", password: "", confirmation: ""};

    errors = validateEmail(email, errors);
    errors = validatePassword(password, errors);
    errors = validateConfirmation(password, confirmation, errors);

    console.log(errors);

    console.log(checkErrors(errors));

    return errors;
}

export function validateSignIn(email: string, password: string) {
    let errors: Errors = {email: "", password: ""};

    errors = validateEmail(email, errors);
    errors = validatePassword(password, errors);

    console.log(errors);

    return errors;
}

// Returns true if all errors have value "", otherwise returns false
export function checkErrors(errors: Errors) {
    return Object.values(errors).every((v) => v === "");
}
