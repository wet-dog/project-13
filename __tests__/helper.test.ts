import { terminate } from "@firebase/firestore"
import { db } from "../src/utils/firebase"


// Close database connection so tests can end
afterAll(() => {
	terminate(db);
});
