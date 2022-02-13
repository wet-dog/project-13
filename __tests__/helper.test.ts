import { fetchText } from "../helpers";

describe("Firebase helper functions", () => {
    it("fetches the text 'test string'", async () => {
        await expect(fetchText()).resolves.toBe("test string");
    });
});
