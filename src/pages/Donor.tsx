import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@native-base/icons";
import { Icon, NativeBaseProvider } from "native-base";

import FoodListDonor from "./FoodListDonor";
import MapScreen from './MapScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function Donor() {
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
              iconName = "food"
            } else if (route.name === 'Map') {
              iconName = "map";
            }

            return <Icon as={<MaterialCommunityIcons name={iconName} />} size={size} color={color} />;
          },
          // #22c55e
          tabBarActiveTintColor: '#84cc16',
          tabBarInactiveTintColor: '#fafafa',
          headerShown: false,
        })}
    >
      <Tab.Screen name="Requests" component={FoodListDonor} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
    </NativeBaseProvider>
  );
}

export default Donor;
