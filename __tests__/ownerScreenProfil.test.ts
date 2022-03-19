
import {addStaff} from '../src/utils/ownerOperations'
describe("Adding staff", () => {
    it("adds a staff correctly", async () => {
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

        let email = randomString(4) + "gmail.com";
        let password = randomString(8)
        let confirmation = password;
       
        expect(await addStaff(email,password, confirmation)).toBe(true);
    })
})