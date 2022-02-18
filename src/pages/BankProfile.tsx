
import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
} from "native-base";
import { TextInput } from "react-native";

function BankProfile() {
  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="lg">Foodbank Details</Heading>
          <VStack space={5} alignItems="center">
            <HStack space={2} alignItems="center">
              <Text>Name:</Text>
              <TextInput 
                  underlineColorAndroid = "transparent"
                placeholder = "Bath City Foodbank"
                placeholderTextColor = "#666"
                autoCapitalize = "words"
              />
            </HStack>
            <HStack space={2} alignItems="center">
              <Text>Address:</Text>
              <TextInput 
                  underlineColorAndroid = "transparent"
                placeholder = "12 Donation Road, Bath"
                placeholderTextColor = "#666"
                autoCapitalize = "words"
              />
            </HStack>
            <HStack space={2} alignItems="center">
              <Text>Postcode:</Text>
              <TextInput 
                  underlineColorAndroid = "transparent"
                placeholder = "BA1 3PL"
                placeholderTextColor = "#666"
                autoCapitalize = "words"
                maxLength = {8}
              />
              </HStack>
          </VStack>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

export default BankProfile;
