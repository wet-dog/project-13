
import React, { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  Center,
  Heading,
  NativeBaseProvider,
  VStack,
  Box
} from "native-base";

function BankProfile() {
  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            Food Bank Profile
          </Heading>
          <VStack space={3} mt="5">
            <FormControl isRequired>
              <FormControl.Label>Name</FormControl.Label>
              <Input placeholder="Bath City Food Bank" placeholderTextColor="#666" /*onChangeText={text => setName(text)}*/ />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Address</FormControl.Label>
              <Input placeholder="12 Donation Road, Bath" placeholderTextColor="#666" /*onChangeText={text => set(text)}*/ />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Postcode</FormControl.Label>
              <Input placeholder="BA1 1AA" maxLength={8} placeholderTextColor="#666" /*onChangeText={text => setName(text)}*/ />
            </FormControl>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default BankProfile;
