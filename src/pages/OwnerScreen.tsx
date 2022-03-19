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
} from "native-base";

import { fetchUserArray } from "../utils/helpers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {updateStaff} from '../utils/foodBankDatabase'
import {addStaff} from '../utils/ownerOperations';
import { RootStackParamList } from "../../App";
import { addNewUser, signUp } from "../utils/registration";
import { fetchBankID, userBank,} from "../utils/foodListDatabase";
import {auth} from '../utils/registration';
type Props = NativeStackScreenProps<RootStackParamList, "TestScreen">;

function OwnerScreen({navigation} : Props) {

  const [staffArray, setStaff] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const as = async () => {
    await addStaff(email, password, confirmation);
  }

  useEffect(() => {
    const fetch = async () => {
      let data = await fetchUserArray();
      setStaff(data);
    }
    fetch();

  }, [])


  return (

    <NativeBaseProvider>
      <Heading size="lg">Owner Screen</Heading>
      <Center px={4} flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <VStack space = {5} alignItems={"center"}>

            <Button onPress={() => navigation.navigate("MapScreen")}>Map Screen</Button>

            <Button onPress={() => navigation.navigate("FoodListStaff")}>Food List</Button>

            <Button onPress={() => navigation.navigate("BankProfile")}>Edit Bank Profile Settings</Button>

            <Heading>Add Staff</Heading>
            <Center>


            <FormControl isRequired >
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText= {(text) => setEmail(text)} />

            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" onChangeText={(text) => setPassword(text)} />

            </FormControl>

            <FormControl isRequired >
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type="password" onChangeText={(text) => setConfirmation(text)}/>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={as}>
              Sign up
            </Button>
           </Center>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default OwnerScreen;

