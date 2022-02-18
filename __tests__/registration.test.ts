import { signUp, signIn, exportedForTesting, Errors } from "../src/utils/registration";
const {
    validateEmail,
    validatePassword,
    validateConfirmation,
    validateSignUp,
    validateSignIn,
    checkErrors
} = exportedForTesting;

// describe("Sign up auth", () => {
//     it("signs up a user", async () => {
//         await expect(signUp("huminater@gmail.com", "foo123", "foo123")).resolves.toBe(true);
//     });
// });

describe("Email validation", () => {
    let errors: Errors;

    beforeAll(() => {
        errors = { email: "", password: "" };
    });

    it("accepts a correct email", () => {
        expect(validateEmail("huminater@gmail.com", errors))
            .toEqual({ email: "", password: "" });
    });

    it("rejects an empty email", () => {
        expect(validateEmail("", errors))
            .toEqual({ email: "Choose an email address", password: "" });
    });

    it.todo("rejects a non-alphanumeric email");
});

describe("Password validation", () => {
    let errors: Errors;

    beforeAll(() => {
        errors = { email: "", password: "" };
    });

    it("accepts a correct password", () => {
        expect(validatePassword("password123", errors))
            .toEqual({ email: "", password: "" });      
    });

    it("rejects a password that is too short", () => {
        expect(validatePassword("short", errors))
            .toEqual({ email: "", password: "Use 8 characters or more for your password" });
    });

    it.todo("rejects a weak password");

    it.todo("rejects a password with invalid characters");
});

describe("Confirmation password validation", () => {
    let errors: Errors;

    beforeAll(() => {
        errors = { email: "", password: "", confirmation: "" };
    });

    it("accepts a matching confirmation password", () => {
        expect(validateConfirmation("password123", "password123", errors))
            .toEqual({ email: "", password: "", confirmation: "" });
    });

    it("rejects a differing confirmation password", () => {
        expect(validateConfirmation("wrong123", "password123", errors))
            .toEqual({ email: "", password: "", confirmation: "Those passwords didn't match. Try again." });
    });
});
