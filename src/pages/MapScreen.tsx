import React, { useEffect, useState } from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
} from "native-base";

import "firebase/firestore";
import {Button, Dimensions, StyleSheet, View} from "react-native";
import MapView, {Marker, Callout} from "react-native-maps";

type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, "MapScreen">;

// @ts-ignore
function MapScreen({ navigation }: Props) {
    return (
      <NativeBaseProvider>
        {/* <View style={donorStyles.container}>
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
                        pinColor="red"
                    >
                        <Callout>
                            <Text>Bath Food Bank</Text>
                            <Text>
                            </Text>
                        </Callout>
                    </Marker>
                    <Marker
                        coordinate={{latitude: 51.376589987348126 , longitude: -2.353022676358978}}
                        pinColor="blue"
                    >
                        <Callout>
                            <Text>Co-op Food - Drop off point</Text>
                        </Callout>
                    </Marker>
            </MapView>
        </View> */}
      </NativeBaseProvider>
    );
}

const donorStyles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: "center",
        backgroundColor: "floralwhite",
    },
    heading: {
        fontSize: 20,
        fontWeight: "300",
        textAlign: "center",
        color: "darkseagreen",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
});

export default MapScreen;
