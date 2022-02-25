import React, { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  Center,
  Heading,
  NativeBaseProvider,
  VStack,
  Box,
  Button,
  Text
} from "native-base";
import { foodbankUpdate, BankErrors } from "../utils/bankprofile";

function BankProfile() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  const [errors, setErrors] = useState<BankErrors>({name: "", address: "", postcode: ""});
  const [success, setSuccess] = useState("");

  async function onUpdate() {   

    let result = await foodbankUpdate(name, address, postcode);

    if (!result) {
      console.log("Validation Failed.");
      setSuccess("Error! Changes not saved.");
      setErrors(result);
    } else {
      setSuccess("Changes saved!");
    }
  }

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
              <Input placeholder="Bath City Food Bank" placeholderTextColor="#666" onChangeText={text => setName(text)} />
              <FormControl.ErrorMessage>{ errors.name }</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Address</FormControl.Label>
              <Input placeholder="12 Donation Road, Bath" placeholderTextColor="#666" onChangeText={text => setAddress(text)} />
              <FormControl.ErrorMessage>{ errors.address }</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Postcode</FormControl.Label>
              <Input placeholder="BA1 1AA" maxLength={8} placeholderTextColor="#666" onChangeText={text => setPostcode(text)} />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={onUpdate}>
              Save Changes
            </Button>
            <Text>{ success }</Text>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default BankProfile;
