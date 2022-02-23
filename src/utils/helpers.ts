import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchText() {
    let docRef = doc(db, "test", "03GlJwswWlTGyupX5KWE");
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().foo;
    }
}

