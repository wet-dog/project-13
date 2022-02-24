import React, { useEffect, useState } from "react";
import { 
  NativeBaseProvider, 
  Center, 
  VStack, 
  Heading,
  Text,
  Button
} from "native-base";

import {test} from '../utils/foodListDatabase'
import * as Location from 'expo-location';

function FoodList() {

  test();
  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="lg">Food List</Heading>
        </VStack>
      </Center>
    </NativeBaseProvider>
  ); 
}

export default FoodList;
