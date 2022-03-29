import { updateStaff } from "./foodBankDatabase";
import { fetchBankID, userBank } from "./foodListDatabase";
import { addNewUser, auth, signUp } from "./registration";

export async function addStaff(email: string, password: string, confirmation: string) {
    let admin = auth.currentUser!;
    let result = await signUp(email, password, confirmation);
    if (result === true) {
        try {
            addNewUser(email, "staff", await fetchBankID(await userBank(auth.currentUser!.uid)) );
            updateStaff(email, admin);
        } catch (error) {
            console.log("Error adding staff to database");
        } 
    } else {
        console.log(result);
    }

    return true;
}
