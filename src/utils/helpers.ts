
import { collection, doc, getDoc, getDocs, QueryDocumentSnapshot} from "firebase/firestore";
import { db } from "./firebase";



type foodData = {
    id: String,
    bankName: String,
    distance: Number,
    foods: String[]
}

const converter = {
    async fromFirestore(
        doc: QueryDocumentSnapshot
    ): Promise<foodData>{
        return doc.data().email
    }
}


/* TODO ensure it only shows the users that are valid to add as in not registered in any other firebase document */
export const fetchUserArray = async () => {

    const snapshot = await getDocs(collection(db, 'users'));

    const data = await Promise.all(snapshot.docs.map(doc => converter.fromFirestore(doc)))

    return data;

}

