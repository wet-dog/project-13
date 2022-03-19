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

          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#047857',
            backgroundColor: "#062d23",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 1.0,
            shadowRadius: 12.0,
            elevation: 24,
            position: 'relative',
            zIndex: 0,
          },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Requests') {
              iconName = "fastfood"
            } else if (route.name === 'Profile') {
              iconName = "food-bank";
            }

            return <Icon as={<MaterialIcons name={iconName} />} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#84cc16',
          tabBarInactiveTintColor: '#D3D3D3',
          headerShown: false,
        })}
    >
      <Tab.Screen name="Requests" component={FoodListStaff} />
      <Tab.Screen name="Profile" component={BankProfile} />
    </Tab.Navigator>
    </NativeBaseProvider>
  );
}

export default Staff;
