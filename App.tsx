import React, { useEffect, useState } from "react";
import {
  Button,
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


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from "./src/pages/MapScreen";
import TestScreen from "./src/pages/TestScreen";
import BankProfile from "./src/pages/BankProfile";
import FoodList from "./src/pages/FoodList";
import SignInScreen from "./src/pages/SignInScreen";
import SignUpScreen from "./src/pages/SignUpScreen";
import OwnerScreen from "./src/pages/OwnerScreen";
import { LogBox } from "react-native";

type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OwnerScreen: undefined;
}


const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TestScreen" component={TestScreen}/>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="BankProfile" component={BankProfile} />
        <Stack.Screen name="FoodList" component={FoodList} />
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="OwnerScreen" component={OwnerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
