
import { doc, getDoc, getDocs, collection, QueryDocumentSnapshot, query , where,  DocumentData, arrayUnion, updateDoc, arrayRemove} from "firebase/firestore";
import { db } from "./firebase";
import * as Location from 'expo-location';


export type foodData = {
    bankID: String,
    bankName: String,
    distance: Number | boolean,
    foods: String[]
}

type location = {
    latitude: number,
    longitude: number,
}

const fetchFoodBankLocation = async (bankID: any) => {

    const docRef = doc(db, "foodBank", bankID);

    const snapshot:any = await getDoc(docRef);

    let longitude, latitude;

    let location = snapshot.data().location;
    latitude = location.latitude
    longitude = location.longitude


    return {latitude, longitude}

}

const fetchUserLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted'){
            console.log("location not authorized");
        }

        let location = await Location.getCurrentPositionAsync({});
        let {latitude, longitude}: location = location.coords;
        return {latitude, longitude}

    } catch (error){
        /* return bath as default if any failure. */
        let latitude = "51.38053526693603"
        let longitude = "-2.3574276156772203"
        return {latitude, longitude}
    }
    
    
}

const calculateDistance = async (userLocation: any, bankLocation : any) => {

    try {
         let lat1 = userLocation.latitude;
    let lon1 = userLocation.longitude;
    let lat2 = bankLocation.latitude;
    let lon2 = bankLocation.longitude;

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }

    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
    }

    return dist;
    } catch(error){
        return false;
    }
   
}

const converter = {
    async fromFirestore(
        doc: QueryDocumentSnapshot<DocumentData>
    ): Promise<foodData>{
        const {bankID,  foods} = doc.data()


        const obj = {
            bankID,
            foods,
            bankName: await foodBankName(bankID),
            distance: await calculateDistance(await fetchUserLocation(), await fetchFoodBankLocation(bankID))
        }

        return obj
    }
}

export const fetchFood = async (): Promise<foodData[]> => {

    const snapshot = await getDocs(collection(db, 'food'));

    const data = await Promise.all(snapshot.docs.map(doc => converter.fromFirestore(doc)))

    return data;

}


export const fetchBankID = async (bankName: String)  => {


    const q2 = query(collection(db, "foodBank"), where("bankName", "==", bankName));
    const qSnap = await getDocs(q2);

    let id: string = "";
    qSnap.forEach((doc) => {
        id = doc.id;
    })

    return id;

}


export const userBank = async (userID: String) => {

    const q = query(collection(db, "foodBank"));

    let name = "";
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
    
            if (doc.data().staff.includes(userID) || doc.data().admin == userID){
                name = doc.data().bankName;
            }
    });


    return name;
}



/* enter name of bank to insert too, food item and whether you wish to remove / update */
export const insertFood = async (bankName: String, food: String, remove: boolean) => {

    if (!food && !remove){
        console.log("cant insert nothing");
        return false;
    }
    const bankID = await fetchBankID(bankName);
    const q = query(collection(db, "food"), where("bankID", "==", bankID));
    const foodSnap = await getDocs(q);

    let id: string | undefined;
    foodSnap.forEach((doc) => {

        id = doc.id;
    })

    const foodRef = doc(db, `food/${id}`);

    /* check if the food is in the speicified database */
    const checkFood = await fetchFood();
    let exists: boolean = false;
    checkFood.forEach(item => {
        if (item.bankName == bankName){
           if (item.foods.includes(food)){
               exists = true;
           }
        }
    })

   
    if (remove){
        if (exists){
       
            await updateDoc(foodRef, {
                foods: arrayRemove(food)
            })
        } else {
            console.log("did not update/remove as that food item does not exist")
            return false;
        }
    }
    else {
        if (!exists){
         
             await updateDoc(foodRef, {
                foods: arrayUnion(food)
            })
        }
        else {
            console.log("that food item already exists in the database")
            return false;
        }
    }
    return true;



}

export const updateFood = async (bankName: String, oldFood: String, newFood : String) => {

    if (await insertFood(bankName, oldFood, true)) {
        if (newFood != ""){
        
             await insertFood(bankName, newFood, false);
        }
        else{
            console.log("that food is empty");
        }
    }
    else {
        console.log("that item does not exist");
    }
}

export const foodBankName = async (bankID: string) => {
    if (bankID == ""){
        return false;
    }

    try {
        const docRef = doc(db, "foodBank", bankID);

        const snapshot:any = await getDoc(docRef);


        let name = snapshot.data().bankName
        return name
    } catch(error){
        return false;
    }
    

}

export const wipeFoodArray = async (bankName: String, testRemove: boolean) => {


    const bankID = await fetchBankID(bankName);

    const q = query(collection(db, "food"), where("bankID", "==", bankID));
    const foodSnap = await getDocs(q);

    let data;
    let id: string | undefined;
    foodSnap.forEach((doc) => {
        data = doc.data();
        id = doc.id;
    })


    const foodRef = doc(db, `food/${id}`);
  

    if (!testRemove){
        await updateDoc(foodRef, {
            foods: []
        })
    }

    return true;

}


export async function resetFoodArray(bankName: String) {
    const bankID = await fetchBankID(bankName);

    const q = query(collection(db, "food"), where("bankID", "==", bankID));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { foods: ["Chicken", "Beef", "Pork", "Fish"] });
    });
}

export {
    calculateDistance

}