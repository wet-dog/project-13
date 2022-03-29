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
  Spacer,
} from "native-base";

import { fetchUserArray } from "../utils/helpers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {updateStaff} from '../utils/foodBankDatabase'
import {addStaff} from '../utils/ownerOperations';
import { RootStackParamList } from "../../App";
import { addNewUser, signUp } from "../utils/registration";
import { fetchBankID, userBank,} from "../utils/foodListDatabase";
import {auth} from '../utils/registration';
import { LinearGradient } from "expo-linear-gradient";
type Props = NativeStackScreenProps<RootStackParamList>;

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

function OwnerScreen({navigation} : Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const onSubmit = async () => {
    await addStaff(email, password, confirmation);
  }

  return (

    <NativeBaseProvider config={config}>
      <Center px={4} flex={1}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          Add Staff
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input testID="EmailInput" onChangeText= {(text) => setEmail(text)} />
            </FormControl>

            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input testID="PasswordInput" type="password" onChangeText={(text) => setPassword(text)} />
            </FormControl>

            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input testID="ConfirmationInput" type="password" onChangeText={(text) => setConfirmation(text)} />
            </FormControl>

            <Button testID="SignUpButton" mt="2" backgroundColor="lime.600" onPress={onSubmit}>
              Sign up
            </Button>

            <Button backgroundColor="lime.600" mt="5" onPress={() => navigation.navigate("BankProfile")}>Edit Bank Profile Settings</Button>
          </VStack>

        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default OwnerScreen;
