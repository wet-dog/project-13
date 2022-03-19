import { updateStaff } from "./foodBankDatabase";
import { fetchBankID, userBank } from "./foodListDatabase";
import { addNewUser, auth, signUp } from "./registration";

export const addStaff = async (email: string, password: string, confirmation: string, testBankID: string = "IFPYo5AVGKA8t490xTpl") => {
      
      let admin = auth.currentUser!;
      let result = await signUp(email, password, confirmation);
      if (result) {

        try {
             addNewUser(email, "staff", await fetchBankID(await userBank(auth.currentUser!.uid)) );
             updateStaff(email, admin);
        }
        catch (error){
            addNewUser(email, "staff", testBankID );
            return true;
        } 
      }else {
        console.log("erorrs adding staff");
      }

  }