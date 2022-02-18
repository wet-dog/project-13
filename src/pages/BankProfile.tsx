
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
} from "native-base";

function BankProfile() {
  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="lg">Foodbank Details</Heading>
          <HStack space={2} alignItems="center">
            <Text>Name:</Text>
            <TextInput 
                underlineColorAndroid = "transparent"
               placeholder = "Bath City Foodbank"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "words"
            />
            <Text>Name:</Text>
            <TextInput 
                underlineColorAndroid = "transparent"
               placeholder = "Bath City Foodbank"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "words"
            />
            <Text>Address:</Text>
            <TextInput 
                underlineColorAndroid = "transparent"
               placeholder = "12 Donation Road, Bath"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "words"
            />
            <Text>Postcode:</Text>
            <TextInput 
                underlineColorAndroid = "transparent"
               placeholder = "BA1 3PL"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "all"
               maxLength = {8}
            />
          </HStack>
          <ToggleDarkMode />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

export default BankProfile;
