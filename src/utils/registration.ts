import {
    getAuth,
    onAuthStateChanged,
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

export async function signUp(email: string, password: string, confirmation: string) {
    let errors = validateSignUp(email, password, confirmation);

    if (checkErrors(errors)) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return true;
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                errors.email = "That email is taken. Try another.";
            }
        }
    }
    
    return errors;
}

export async function signIn(email: string, password: string) {
    let errors = validateSignIn(email, password);
    if (checkErrors(errors)) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (err: any) {
            if (err.code === "auth/user-not-found") {
                errors.email = "Couldn't find your email"
            } else if (err.code === "auth/wrong-password") {
                errors.password = "Wrong password. Try again or click 'Forgot password' to reset it.";
            }
        }
    }
    
    return errors;
}

export type Errors = {
    email: string,
    password: string,
    confirmation?: string
}

// TODO: Add better validation
//       1. Sorry, only letters (a-z), number (0-9), and periods (.) are allowed.
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
function validateSignUp(email: string, password: string, confirmation: string) {
    let errors: Errors = {email: "", password: "", confirmation: ""};

    errors = validateEmail(email, errors);
    errors = validatePassword(password, errors);
    errors = validateConfirmation(password, confirmation, errors);

    console.log(errors);

    console.log(checkErrors(errors));

    return errors;
}

function validateSignIn(email: string, password: string) {
    let errors: Errors = {email: "", password: ""};

    errors = validateEmail(email, errors);
    errors = validatePassword(password, errors);

    console.log(errors);

    return errors;
}

// Returns true if all errors have value "", otherwise returns false
function checkErrors(errors: Errors) {
    return Object.values(errors).every((v) => v === "");
}

export const exportedForTesting = {
    validateEmail,
    validatePassword,
    validateConfirmation,
    validateSignUp,
    validateSignIn,
    checkErrors
}
