import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from "@native-base/icons";
import { Icon, NativeBaseProvider } from "native-base";

import FoodListStaff from './FoodListStaff';
import BankProfile from './BankProfile';

const Tab = createBottomTabNavigator();

function Staff() {
  return (
    <NativeBaseProvider>
    <Tab.Navigator 
    
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Requests') {
              iconName = "fastfood"
            } else if (route.name === 'Profile') {
              iconName = "food-bank";
            }

            return <Icon as={<MaterialIcons name={iconName} />} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#22c55e',
          tabBarInactiveTintColor: '#D3D3D3',
        })}
    >
      <Tab.Screen name="Requests" component={FoodListStaff} />
      <Tab.Screen name="Profile" component={BankProfile} />
    </Tab.Navigator>
    </NativeBaseProvider>
  );
}

export default Staff;
