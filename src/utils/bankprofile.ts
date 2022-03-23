import { doc, getDoc, getDocs, updateDoc, GeoPoint, query, collection, where } from "firebase/firestore";
import { diffClamp, RollInLeft } from "react-native-reanimated";
import { db } from "./firebase";

export async function fetchBank(uid: string) {
    // Find the foodbank containing the relevant uid in admin field
    let q = query(collection(db, "foodBank"), where("admin", "==", uid));
    let banks = await getDocs(q);
    let id: string = "none";
    banks.forEach((doc) => {
        id = doc.id;
    });

    // User is not registered as owner on any food bank
    if (id == "none") {
        console.log("Error: User is not registered as owner on any food bank");
    }

    // Find the foodbank containing the relevant uid in staff array
    let staffQuery = query(collection(db, "foodBank"), where("staff", "array-contains", uid));
    banks = await getDocs(staffQuery);
    banks.forEach((doc) => {
        id = doc.id;
    });

    // User is not registered as owner on any food bank
    if (id == "none") {
        console.log("Error: User is not registered as staff on any food bank");
        return {
            bankName: "",
            description: "",
            location: {_lat: "", _long: ""}
        }
    }

    let docRef = doc(db, "foodBank", id);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();  
    }
}

export async function getUserRole(uid: string) {
    let docRef = doc(db, "users", uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let data = docSnap.data();
        // Check if user is owner or staff
        if (data.roles.owner === true) {
            return true;
        } else if (data.roles.staff === true) {
            return false;
        }
    }
    // This should never happen...
    console.log("Error: Donor has accessed food bank profile page.");
    return null;
}

export async function getEmailRole(email: string) {
    const q = query(collection(db, "users"), where("email", "==", email)); 
    const querySnapshot = await getDocs(q);
    
    let role;
    querySnapshot.forEach(async (doc) => {
        console.log("Found user's role by email.");
        role = getUserRole(doc.id);
    });

    return role;
}

export async function foodbankUpdate(uid: string, name: string, desc: string, lat: string, long: string) {

    let errors = validateBankDetails(name, lat, long);
    
    if (errors == true) {
        let q = query(collection(db, "foodBank"), where("admin", "==", uid));
        let banks = await getDocs(q);
        let id: string = "none";
        banks.forEach((doc) => {
            id = doc.id;
        });
        let docRef = doc(db, "foodBank", id);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const bankRef = doc(db, `foodBank/${id}`);
            // Update relevant attributes
            // Change location to geotag
            await updateDoc(bankRef, {
                bankName: name,
                description: desc,
                location: new GeoPoint(parseFloat(lat), parseFloat(long))
            });
        }
    }

    return errors;
}

function validateBankDetails(name: string, lat: string, long: string) {
    let errors: BankErrors = {name: "", lat: "", long: ""};

    errors = validateName(name, errors);
    errors = validateLatLong(lat, long, errors);

    if (checkErrors(errors)) {
        return true;
    }

    return errors;
}

export function validateName(name: string, errors: BankErrors) {
    if (name === "") {
        errors.name = "Name cannot be empty";
    }
    if (name.length > 32) {
        errors.name = "Name cannot be longer than 32 characters";
    }
    return errors;
}

export function validateLatLong(lat: string, long: string, errors: BankErrors) {
    if (lat === "") {
        errors.lat = "Latitude cannot be empty";
    } else {
        let latFloat = parseFloat(lat);
        if (isNaN(latFloat)) {
            errors.lat = "Latitude must be a number";
        } else {
            if (latFloat < -90 || latFloat > 90) {
                errors.lat = "Latitude must be between -90 and 90";
            }
        }
    }
    if (long === "") {
        errors.long = "Longitude cannot be empty";
    } else {
        let longFloat = parseFloat(long);
        if (isNaN(longFloat)) {
            errors.long = "Longitude must be a number";
        } else {
            if (longFloat < -90 || longFloat > 90) {
                errors.long = "Longitude must be between -90 and 90";
            }
        }
    }
    return errors;
}

function checkErrors(errors: BankErrors) {
    return Object.values(errors).every((v) => v === "");
}

export type BankErrors = {
    name: string,
    lat: string,
    long: string
}
