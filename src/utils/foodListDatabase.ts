import { DocumentData } from "@firebase/firestore-types";
import { doc, getDoc, getDocs, collection, QueryDocumentSnapshot, query , where} from "firebase/firestore";
import { db } from "./firebase";
import * as Location from 'expo-location';
 
type foodData = {
    id: String,
    bankName: String,
    distance: Number,
    foods: String[]
}

type location = {
    latitude: number,
    longitude: number,
}

const fetchFoodBankLocation = async (bankName: any) => {

    const q = query(collection(db, 'foodBank'), where ("bankName", "==", bankName))
    const querySnapshot = await getDocs(q);

    let latitude , longitude;
    querySnapshot.forEach(doc => {
        let location = doc.data().location;
        latitude = location.latitude
        longitude = location.longitude
    })

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
        const {id, bankName, foods} = doc.data()

        const obj = {
            id,
            bankName,
            foods,
            distance: await calculateDistance(await fetchUserLocation(), await fetchFoodBankLocation(bankName))
        }
        return obj
    }
}

export const fetchFood = async () => {
    const snapshot = await getDocs(collection(db, 'food'));

    let data: foodData[] = [];

    snapshot.docs.forEach(async doc => {
        data.push(await converter.fromFirestore(doc))
    })
    return data;

} 

