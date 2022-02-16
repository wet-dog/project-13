import { signUp, signIn } from "../src/utils/registration";

describe("Sign up and sign in auth", () => {
    it("signs up a user", async () => {
        await expect(signUp("huminater@gmail.com", "foo123")).resolves.toBe(true);
    });
    
    it("signs in a user", async () => {
        await expect(signIn("huminater@gmail.com", "foo123")).resolves.toBe(true);
    });
});
