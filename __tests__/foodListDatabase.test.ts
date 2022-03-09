import { fetchFood , fetchBankID, userBank } from "../src/utils/foodListDatabase";

// describe("Fetching food list data", () => {
//     it("fetches food list", async () => {
//         let data = await fetchFood();
//         console.log(data);
//         expect(data).toBe(true);
//     });
// });

describe("Fetch Food Bank ID", () => {

    it("works", async () => {
      
        expect(await fetchBankID("Bristol Food Bank")).toBe("IFPYo5AVGKA8t490xTpl");
    })


})

describe("fetch user bank", () => {

    it("works", async() => {
        expect(await userBank("xlFhvK6NMMSPP58FRPvDCStELPJ3")).toBe("Bristol Food Bank")
    })

})


