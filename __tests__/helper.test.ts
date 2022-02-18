import { terminate } from "@firebase/firestore"
import { fetchText } from "../src/utils/helpers";
import { db } from "../src/utils/firebase"

describe("Firebase helper functions", () => {
    it("fetches the text 'test string'", async () => {
        await expect(fetchText()).resolves.toBe("test string");
    });
});

// Close database connection so tests can end
afterAll(() => {
	terminate(db);
});
