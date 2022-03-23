import React, {useCallback, useMemo, useRef} from "react";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import FlatButton from "../../assets/button.js";


import {
  Text,
  NativeBaseProvider,
  Image,
  ScrollView,
  Box
} from "native-base";

import "firebase/firestore";
import { Dimensions, Linking, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import FoodListEmbed from "../components/FoodListEmbed";
import { useState, useEffect } from "react";


// @ts-ignore
function MapScreen({renderImages = true}) {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

   // variables
    const snapPoints = useMemo(() => ['40%', '90%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // ref
    const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress2 = useCallback(() => {
        bottomSheetModalRef2.current?.present();
    }, []);

    // ref
    const bottomSheetModalRef3 = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress3 = useCallback(() => {
        bottomSheetModalRef3.current?.present();
    }, []);

    // ref
    const bottomSheetModalRef4 = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress4 = useCallback(() => {
        bottomSheetModalRef4.current?.present();
    }, []);

    // ref
    const bottomSheetModalRef5 = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress5 = useCallback(() => {
        bottomSheetModalRef5.current?.present();
    }, []);

    console.log()
    return (

        <NativeBaseProvider>

            <BottomSheetModalProvider>
                <Box safeAreaTop flex="1" backgroundColor="emerald.700">
                    <Text style={donorStyles.heading}>Select a food bank or drop off point</Text>
                    <MapView style={donorStyles.map}
                             initialRegion={{
                                 latitude: 51.38280,
                                 longitude: -2.35928,
                                 latitudeDelta: 0.0222,
                                 longitudeDelta: 0.0221
                             }}
                    >
                        <Marker
                            coordinate={{latitude: 51.37952, longitude: -2.35717}}
                            pinColor='red'
                            onPress={handlePresentModalPress}
                        >
                        </Marker>

                        <Marker
                            coordinate={{latitude: 51.376589987348126 , longitude: -2.353022676358978}}
                            pinColor='blue'
                            onPress={handlePresentModalPress5}
                        >
                        </Marker>

                        <Marker
                            coordinate={{latitude: 51.38193602034993 , longitude: -2.368569704831658}}
                            pinColor='blue'
                            onPress={handlePresentModalPress3}
                        >
                        </Marker>

                        <Marker
                            coordinate={{latitude: 51.38407457143325 , longitude: -2.359059211524059}}
                            pinColor='blue'
                            onPress={handlePresentModalPress4}
                        >
                        </Marker>

                    </MapView>

                    <View style={styles.container}>
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                        >
                            <ScrollView style={styles.contentContainer}>
                                <Text style={styles.heading}>Bath Food Bank - Manvers</Text>
                                {renderImages && <Image style={styles.stretch} source={require('../../images/img-manvers.png')}/>}
                                <Text style={styles.subheading}>Opening Times:</Text>
                                <Text style={styles.info}>Mon: 12.30-14.30</Text>
                                <Text style={styles.info}>Wed: 12.45-14.30</Text>
                                <Text style={styles.info}>Thu: 12.30-14.30</Text>
                                <Text style={styles.subheading}>Requested Food:</Text>
                                <FoodListEmbed bankId="Qqed4wWZlfrBpwQ65Sg6" />
                                <Text style={styles.subheading}>Links:</Text>
                                <FlatButton text='Website' onPress={() => Linking.openURL('https://bath.foodbank.org.uk')}/>
                                <FlatButton text='Directions' onPress={() => Linking.openURL('https://www.google.com/maps/dir//51.3788818,-2.356582/@51.378818,-2.4268014,12z')}/>
                            </ScrollView>
                        </BottomSheetModal>
                    </View>

                    <View style={styles.container}>
                        <BottomSheetModal
                            ref={bottomSheetModalRef2}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                        >
                            <ScrollView style={styles.contentContainer}>
                                <Text style={styles.heading}>Bath Food Bank - Lighthouse Centre</Text>
                                {renderImages && <Image style={styles.stretch} source={require('../../images/img1.png')}/>}
                                <Text style={styles.subheading}>Opening Times</Text>
                                <Text style={styles.info}>Tue: 09.30-23.30</Text>
                                <Text style={styles.info}>Thu: 09.30-23.30</Text>
                                <Text style={styles.subheading}>Requested Food</Text>
                                <Text style={styles.info}>Food 1</Text>
                                <Text style={styles.info}>Food 2</Text>
                                <Text style={styles.subheading}>Rejected Food</Text>
                                <Text style={styles.info}>Food 4</Text>
                                <Text style={styles.info}>Food 5</Text>
                                <Text style={styles.subheading}>Links</Text>
                                <FlatButton text='Website' onPress={() => Linking.openURL('https://bath.foodbank.org.uk')}/>
                                <FlatButton text='Directions' onPress={() => Linking.openURL('https://www.google.com/maps/place/High+St,+Twerton,+Bath+BA2+1DB/@51.3804493,-2.4074125,14.45z/data=!4m5!3m4!1s0x487186cb5f9998af:0xafad874157b80214!8m2!3d51.3802927!4d-2.3946031\n')}/>
                            </ScrollView>
                        </BottomSheetModal>

                        <BottomSheetModal
                            ref={bottomSheetModalRef3}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                        >
                            <ScrollView style={styles.contentContainer}>
                                <Text style={styles.heading}>Sainsburys</Text>
                                {renderImages && <Image style={styles.stretch} source={require('../../images/img-sains.png')}/>}
                                <Text style={styles.subheading}>Opening Times:</Text>
                                <Text style={styles.info}>Mon-Sat: 07.00-22.00</Text>
                                <Text style={styles.info}>Sun: 11.00-17.00</Text>
                                <Text style={styles.subheading}>Drop off instructions:</Text>
                                <Text style={styles.info}>Foodbank trolley after the tills</Text>
                                <Text style={styles.subheading}>Foodbank Affiliation:</Text>
                                <FlatButton text='BFB' onPress={() => Linking.openURL('https://bath.foodbank.org.uk')}/>
                                <Text style={styles.subheading}>Links</Text>
                                <FlatButton text='Directions' onPress={() => Linking.openURL('https://www.google.com/maps/dir//51.3788818,-2.356582/@51.378818,-2.4268014,12z\n')}/>
                            </ScrollView>
                        </BottomSheetModal>

                        <BottomSheetModal
                            ref={bottomSheetModalRef4}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                        >
                            <ScrollView style={styles.contentContainer}>
                                <Text style={styles.heading}>Waitrose & Partners Bath</Text>
                                {renderImages && <Image style={styles.stretch} source={require('../../images/img-waitrose.png')}/>}
                                <Text style={styles.subheading}>Opening Times:</Text>
                                <Text style={styles.info}>Mon-Fri: 07.30-21.00</Text>
                                <Text style={styles.info}>Sat: 07.30-20.00</Text>
                                <Text style={styles.info}>Sun: 11.00-17.00</Text>
                                <Text style={styles.subheading}>Drop off instructions:</Text>
                                <Text style={styles.info}>Foodbank collection point after the tills</Text>
                                <Text style={styles.subheading}>Foodbank Affiliation:</Text>
                                <FlatButton text='BFB' onPress={() => Linking.openURL('https://bath.foodbank.org.uk')}/>
                                <Text style={styles.subheading}>Links:</Text>
                                <FlatButton text='Directions' onPress={() => Linking.openURL('https://www.google.com/maps/place/Waitrose+%26+Partners+Bath/@51.3835389,-2.3765258,14z/data=!3m2!4b1!5s0x48718112552cbf3b:0xf66b6b89a09ef566!4m5!3m4!1s0x48718113b240ef6f:0x4b2c3e51fc51cb37!8m2!3d51.3835402!4d-2.3590591\n')}/>
                            </ScrollView>
                        </BottomSheetModal>

                        <BottomSheetModal
                            ref={bottomSheetModalRef5}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                        >
                            <ScrollView style={styles.contentContainer}>
                                <Text style={styles.heading}>Co-op</Text>
                                {renderImages && <Image style={styles.stretch} source={require('../../images/img-coop.png')}/>}
                                <Text style={styles.subheading}>Opening Times:</Text>
                                <Text style={styles.info}>Mon-Fri: 07.30-21.00</Text>
                                <Text style={styles.info}>Sat: 07.30-20.00</Text>
                                <Text style={styles.info}>Sun: 11.00-17.00</Text>
                                <Text style={styles.subheading}>Drop off instructions:</Text>
                                <Text style={styles.info}>Foodbank collection point after the tills</Text>
                                <Text style={styles.subheading}>Foodbank Affiliation:</Text>
                                <FlatButton text='BFB' onPress={() => Linking.openURL('https://bath.foodbank.org.uk')}/>
                                <Text style={styles.subheading}>Links:</Text>
                                <FlatButton text='Directions' onPress={() => Linking.openURL('https://www.google.com/maps/dir/51.3763427,-2.3308564/co+op+bath/@51.3788111,-2.3586731,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x4871810f854c7eb3:0x2f92ad06fe35c746!2m2!1d-2.3530216!2d51.3765588')}/>
                            </ScrollView>
                        </BottomSheetModal>


                    </View>

                </Box>

            </BottomSheetModalProvider>

        </NativeBaseProvider>


    )
}

const donorStyles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 5,
        textAlign: "center",
        backgroundColor: "floralwhite",
    },
    heading: {
        fontSize: 20,
        fontWeight: "300",
        textAlign: "center",
        // color: "darkseagreen",
        paddingVertical: 5,
        color: "white",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
    },

    heading: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 22,
        marginLeft: 10,
        color:"green",
        textTransform: 'uppercase',
    },

    subheading: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 22,
        marginLeft: 10,
        color:"green",
        textTransform: 'uppercase',
    },

    times: {
        fontSize: 14,
        textAlign: "center"
    },

    stretch: {
        height: 200,
        resizeMode: 'stretch',
    },

    info: {
        marginTop: 5,
        marginLeft: 10,
        textAlign: "center",
        fontSize: 18,
    },

    link: {
        marginTop: 5,
        marginLeft: 10,
        fontStyle: "italic",
        textAlign: "center",
        fontSize: 18,
    },

});

export default MapScreen;
