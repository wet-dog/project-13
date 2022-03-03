
import { doc, getDoc, getDocs, collection, QueryDocumentSnapshot, query , where,  DocumentData, arrayUnion, updateDoc, arrayRemove} from "firebase/firestore";
import { db } from "./firebase";
import * as Location from 'expo-location';
import { Query } from "@firebase/firestore-types";

 
export type foodData = {
    bankID: String,
    bankName: String,
    distance: Number,
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
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted'){
        console.log("location not authorized");
    }

    let location = await Location.getCurrentPositionAsync({});
    let {latitude, longitude}: location = location.coords;
    return {latitude, longitude}
}

const calculateDistance = async (userLocation: any, bankLocation : any) => {


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

    const bankID = await fetchBankID(bankName);
    const q = query(collection(db, "food"), where("bankID", "==", bankID));
    const foodSnap = await getDocs(q);

    let id: string | undefined;
    foodSnap.forEach((doc) => {
     
        id = doc.id;
    })

    const foodRef = doc(db, `food/${id}`);

    if (remove){
        await updateDoc(foodRef, {
            foods: arrayRemove(food)
        })
    }
    else {
         await updateDoc(foodRef, {
            foods: arrayUnion(food)
        })
    }
    
}

export const updateFood = async (bankName: String, oldFood: String, newFood : String) => {
    await insertFood(bankName, oldFood, true);
    await insertFood(bankName, newFood, false);
}

export const foodBankName = async (bankID: string) => {
    const docRef = doc(db, "foodBank", bankID);

    const snapshot:any = await getDoc(docRef);

    
    let name = snapshot.data().bankName
    return name
   
}

export const wipeFoodArray = async (bankName: String) => {

    console.log("test");
    const bankID = await fetchBankID(bankName);
    console.log("bankID", bankID);
    const q = query(collection(db, "food"), where("bankID", "==", bankID));
    const foodSnap = await getDocs(q);

    let data;
    let id: string | undefined;
    foodSnap.forEach((doc) => {
        data = doc.data();
        id = doc.id;
    })

    console.log(data);
    const foodRef = doc(db, `food/${id}`);
    console

    await updateDoc(foodRef, {
        foods: []
    })

}




