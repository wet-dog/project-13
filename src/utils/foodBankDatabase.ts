import { doc, getDocs, collection, query , updateDoc, where, arrayUnion} from "firebase/firestore";
import { db } from "./firebase";
import { firebaseApp } from './firebase';
import  { getAuth, User } from 'firebase/auth';

export const auth = getAuth(firebaseApp);




export const updateStaff = async (newStaff: String, admin: User) => {

    const adminID = admin.uid;

    const q = query(collection(db, "foodBank"), where("admin", "==", adminID));

   
    const querySnapshot = await getDocs(q);

    let data = {}
    let id: string | undefined;

    querySnapshot.forEach((doc) => {
        data = doc.data();
        id  = doc.id;
    })

    const bankRef = doc(db, `foodBank/${id}`);

    const q2 = query(collection(db, "users"), where("email", "==", newStaff))

    const querySnapshot2 = await getDocs(q2)

    let userId;
    querySnapshot2.forEach((doc) => {
        userId = doc.id;
    })

    await updateDoc(bankRef, {
        staff: arrayUnion(userId)
    })
    
    await auth.updateCurrentUser(admin);
}