import {
    BankErrors,
    fetchBank, //async
    getUserRole, //async
    getEmailRole, //async
    validateName,
    validateLatLong
} from "../src/utils/bankprofile";

describe("Fetch food bank ID from user ID", () => {

    it("returns empty for a bad ID", async () => {
        // Bank details should be blank
        expect(await fetchBank("not-a-good-id")).toStrictEqual({bankName: "", description: "", location: {_lat:"", _long:""}});
    });

});

describe("Get a given user's role", () => {

    it("detects an owner", async () => {
        // bristolowner@gmail.com
        expect(await getEmailRole("bristolowner@gmail.com")).toEqual(true);
    });

    it("detects a staff member", async () => {
        // bathstaff@gmail.com
        expect(await getEmailRole("bathstaff@gmail.com")).toEqual(false);
    });

    it("detects a donor", async () => {
        // donor@gmail.com
        expect(await getEmailRole("donor@gmail.com")).toEqual(null);
    });
});

describe("Validates a food bank name input", () => {

    let errors: BankErrors = {name: "", lat: "", long: ""};

    it("accepts a valid name", async () => {
        let response = validateName("Bath Food Bank", errors);
        expect(response.name).toBe("");
    });

    it("rejects an empty name", async () => {
        let response = validateName("", errors);
        expect(response.name).toBe("Name cannot be empty");
    });

    it("rejects a name that is too long", async () => {
        let response = validateName("1234567890123456789012345678901234567890", errors);
        expect(response.name).toBe("Name cannot be longer than 32 characters");
    });

});

describe("Validates latitude and longitude inputs", () => {

    let errors: BankErrors = {name: "", lat: "", long: ""};

    it("accepts a valid latitude and longitude", async () => {
        let response = validateLatLong("15", "15", errors);
        let check = response.lat + response.long;
        expect(check).toBe("");
    });

    it("rejects an empty latitude", async () => {
        let response = validateLatLong("", "15", errors);
        expect(response.lat).toBe("Latitude cannot be empty");
    });

    it("rejects an empty longitude", async () => {
        let response = validateLatLong("15", "", errors);
        expect(response.long).toBe("Longitude cannot be empty");
    });

    it("rejects a non-numeric latitude", async () => {
        let response = validateLatLong("abc", "15", errors);
        expect(response.lat).toBe("Latitude must be a number");
    });

    it("rejects a non-numeric longitude", async () => {
        let response = validateLatLong("15", "abc", errors);
        expect(response.long).toBe("Longitude must be a number");
    });

    it("rejects a latitude out of range", async () => {
        let response = validateLatLong("91", "15", errors);
        expect(response.lat).toBe("Latitude must be between -90 and 90");
    });

    it("rejects a longitude out of range", async () => {
        let response = validateLatLong("15", "91", errors);
        expect(response.long).toBe("Longitude must be between -90 and 90");
    });

});
