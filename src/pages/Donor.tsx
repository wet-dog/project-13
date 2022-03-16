import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@native-base/icons";
import { Icon, NativeBaseProvider } from "native-base";

import FoodListDonor from "./FoodListDonor";
import MapScreen from './MapScreen';

const Tab = createBottomTabNavigator();

function Donor() {
  return (
    <NativeBaseProvider>
    <Tab.Navigator 
    
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Requests') {
              iconName = "food"
            } else if (route.name === 'Map') {
              iconName = "map";
            }

            return <Icon as={<MaterialCommunityIcons name={iconName} />} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#22c55e',
          tabBarInactiveTintColor: '#D3D3D3',
        })}
    >
      <Tab.Screen name="Requests" component={FoodListDonor} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
    </NativeBaseProvider>
  );
}

export default Donor;
