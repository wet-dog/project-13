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
import NativeBaseIcon from "./components/NativeBaseIcon";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from "./containers/MapScreen";
import TestScreen from "./containers/TestScreen";
import BankProfile from "./containers/BankProfile";
import FoodList from "./containers/FoodList";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";

type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TestScreen" component={TestScreen}/>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="BankProfile" component={BankProfile} />
        <Stack.Screen name="FoodList" component={FoodList} />
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
