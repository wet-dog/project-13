
import { collection, doc, getDoc, getDocs, query, DocumentData , QueryDocumentSnapshot} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchText() {
    let docRef = doc(db, "test", "03GlJwswWlTGyupX5KWE");
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().foo;
    }
}

type foodData = {
    id: String,
    bankName: String,
    distance: Number,
    foods: String[]
}

const converter = {
    async fromFirestore(
        doc: QueryDocumentSnapshot<DocumentData> 
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

