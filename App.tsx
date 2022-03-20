import React from "react";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from "./src/pages/MapScreen";
import BankProfile from "./src/pages/BankProfile";
import FoodListStaff from "./src/pages/FoodListStaff";
import SignInScreen from "./src/pages/SignInScreen";
import SignUpScreen from "./src/pages/SignUpScreen";
import OwnerScreen from "./src/pages/OwnerScreen";
import { LogBox } from "react-native";
import FoodListDonor from "./src/pages/FoodListDonor";
import Donor from "./src/pages/Donor";
import Staff from "./src/pages/Staff";

export type RootStackParamList = {
  MapScreen: undefined;
  BankProfile: undefined;
  FoodListStaff: undefined;
  FoodListDonor: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OwnerScreen: undefined;
  Donor: undefined;
  Staff: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator   screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="BankProfile" component={BankProfile} />
        <Stack.Screen name="FoodListStaff" component={FoodListStaff} />
        <Stack.Screen name="FoodListDonor" component={FoodListDonor} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="OwnerScreen" component={OwnerScreen}/>
        <Stack.Screen name="Donor" component={Donor} options={{ headerShown: false }}/>
        <Stack.Screen name="Staff" component={Staff} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
