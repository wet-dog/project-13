import { async } from "@firebase/util";
import exp from "constants";
import { fetchFood , fetchBankID, userBank,insertFood, calculateDistance, updateFood, foodBankName, foodData, wipeFoodArray, resetFoodArray } from "../src/utils/foodListDatabase";

afterAll(async () => {
    const fetchFoodObj = await fetchFood();
    const bankName = fetchFoodObj[0].bankName;
    resetFoodArray(bankName);
});

describe("Fetch Food Bank ID", () => {

    it("fetches correctly", async () => {
      
        expect(await fetchBankID("Bristol Food Bank")).toBe("IFPYo5AVGKA8t490xTpl");
    })

     it ("fails empty string", async () => {
        expect(await userBank("")).toBe("");
    } )

    it ("fails invalid name", async () => {
        expect(await userBank("kadgjakdghaihgadjihahlia")).toBe("");    
    })


})

describe("fetch user bank", () => {

    it("Test on valid data", async() => {
        expect(await userBank("P3uEIzZr0eNYwRm58l8omX0qeSq2")).toBe("Bristol Food Bank")
    })

    it ("fails empty string", async () => {
        expect(await userBank("")).toBe("");
    } )

    it ("fails invalid id", async () => {
        expect(await userBank("kadgjakdghaihgadjihahlia")).toBe("");    
    })

})

describe("check distance calculation", () => {

    it("Test on valid data", async () => {

        let testObj = {
              "latitude": 51.4597112,
              "longitude": -2.5757641,

        }

        let testUserLocation = {
            "latitude": 51.3908198,
            "longitude": -2.3593564,
        }
        expect(await calculateDistance(testObj,testUserLocation)).toBe(10.467579005535928);
    })

    it ("test on invalid data", async() => {
        expect(await calculateDistance("jsdfkg","shdjkgkds")).toBe(0);
    })

    it ("test on empty values", async() => {
           expect(await calculateDistance("","")).toBe(0);
    })

})

describe("foodBankName", () => {
    it("gets foodbank from id", async () => {
        expect(await foodBankName("IFPYo5AVGKA8t490xTpl")).toBe("Bristol Food Bank");
    })

    it ("empty string", async () => {
        expect(await foodBankName("")).toBe(false);
    })

    it("inalid id", async() => {
        expect(await foodBankName("shdfkgfshj")).toBe(false);
    })
} )

let randomString = (length: number) =>  {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
            }
            return result;
 }

const insertTestItem = async (bankName: String ) =>{
        let testItem = randomString(6)
        await insertFood(bankName, testItem, false);
        return testItem;
}

describe("updateFood", () => {
    /* assumes an item is present in food database */
    it("updates a food item", async () => {
        const fetchFoodObj = await fetchFood();
        const bankName= fetchFoodObj[0].bankName;
        let testItem = await insertTestItem(bankName);
        const newFood = randomString(5);
        await updateFood(bankName, testItem, newFood);
        const testFetch = await fetchFood();
        const extractItem = testFetch[0].foods.pop();
        expect(extractItem).toBe(newFood);
    })

    it("item does not exist",async () => {
        const fetchFoodObj = await fetchFood();
        const updateItem = "sjdgksjdgklsjghlksjhk"
        const bankName= fetchFoodObj[0].bankName;
        const newFood = randomString(6);
        await updateFood(bankName, updateItem, newFood);
        const testFetch = await fetchFood();
        expect(JSON.stringify(testFetch)).toBe(JSON.stringify(fetchFoodObj));
    })
})

describe("insertFood", () =>{
    it("insert food", async () => {
        const fetchFoodObj = await fetchFood();
        const bankName = fetchFoodObj[0].bankName;
        const item = randomString(6);
        await insertFood(bankName, item, false);
        const checkFoodObj = await fetchFood();
        expect(checkFoodObj[0].foods.includes(item)).toBe(true);

    })

    it("check insert duplicate", async () => {
        const fetchFoodObj = await fetchFood();
        const bankName = fetchFoodObj[0].bankName;
        const item = await insertTestItem(bankName);
        const fetchFoodObjAfterAdd = await fetchFood();
        await insertFood(bankName, item, false);
        const checkFoodObj = await fetchFood();
        expect(JSON.stringify(checkFoodObj)).toBe(JSON.stringify(fetchFoodObjAfterAdd));
    })

    it("empty string", async () => {
         const fetchFoodObj = await fetchFood();
        const bankName = fetchFoodObj[0].bankName;
        const item = ""
        await insertFood(bankName, item, false);
        const checkFoodObj = await fetchFood();
        expect(JSON.stringify(checkFoodObj)).toBe(JSON.stringify(fetchFoodObj));
    })
})

describe("remove food", () => {
    it("remove food", async () => {
        const fetchFoodObj = await fetchFood();
        const bankName = fetchFoodObj[0].bankName;
        const addTest = await insertTestItem(bankName);
        await insertFood(bankName, addTest, true);
        const checkFoodObj = await fetchFood();
        expect(!checkFoodObj[0].foods.includes(addTest)).toBe(true);

    })

    it("does not remove if it does not exist", async () => {
        const fetchFoodObj = await fetchFood();
        const bankName = fetchFoodObj[0].bankName;
        const item = randomString(10);
        await insertFood(bankName, item, true);
        const checkFoodObj = await fetchFood();
        expect(JSON.stringify(checkFoodObj)).toBe(JSON.stringify(fetchFoodObj));
    })
})

describe("wipe food array", () => {
    it ("wipes the food array", async () => {
         const fetchFoodObj = await fetchFood();
        const bankName = fetchFoodObj[0].bankName;
        let value = await wipeFoodArray(bankName, true);
        expect(value).toBe(true);
    })
})




