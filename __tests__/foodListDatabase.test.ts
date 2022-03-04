import { fetchFood } from "../src/utils/foodListDatabase";

describe("Fetching food list data", () => {
    it("fetches food list", async () => {
        let data = await fetchFood();
        console.log(data);
        expect(data).toBe(true);
    });
});
