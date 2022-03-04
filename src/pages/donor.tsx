import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Entypo, MaterialIcons, AntDesign } from "@native-base/icons";
import { Icon } from "native-base";

import FoodListDonor from "./FoodListDonor";
import MapScreen from './MapScreen';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // You can return any component that you like here!
            return <Icon as={<Entypo name="add-to-list" />} size="xs" color="coolGray.800" />
          },
        })}
      >
        <Tab.Screen name="FoodList" component={FoodListDonor} />
        <Tab.Screen name="Settings" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}