import {
  FormControl,
  Center,
  Box,
  Heading,
  VStack,
  Input,
  Button,
  NativeBaseProvider,
  Select
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect, SetStateAction } from "react";

import { signUp, Errors, addNewUser, isAdminEmpty } from "../utils/registration";
import { RootStackParamList } from "../../App";
import { fetchBankID } from "../utils/foodListDatabase";

import SelectFoodBank from "../components/SelectFoodBank";
import { getDoc } from "firebase/firestore";

type Props = NativeStackScreenProps<RootStackParamList, "SignUpScreen">;

function SignUpScreen({ navigation }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [role, setRole] = useState("");
  const [bank, setBank] = useState("");

  const [errors, setErrors] = useState<Errors>({email: "", password: "", confirmation: ""});

  async function onSubmit() {    

    let bankID = await fetchBankID(bank);
 
    let isEmpty = false;
    if (role == "owner"){
       isEmpty = await isAdminEmpty(bankID);
    }
    
    if (isEmpty || role != "owner"){
      let result = await signUp(email, password, confirmation);

      if (result == true) {
    
        addNewUser(email, role, bankID);
        navigation.navigate("SignInScreen");
      } else {
        console.log("Validation Failed.");
        setErrors(result);
      }
    }
    else {
      console.log("bank registered with has an admin already and they are trying to become an owner.")
    }
  }

  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          Welcome
          </Heading>
          <Heading mt="1" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }} fontWeight="medium" size="xs">
          Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={errors.email !== ""}>
              <FormControl.Label>Email</FormControl.Label>
              <Input testID="EmailInput" onChangeText= {(text) => setEmail(text)} />
              <FormControl.ErrorMessage testID="EmailErrorMessage">{ errors.email }</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.password !== ""}>
              <FormControl.Label>Password</FormControl.Label>
              <Input testID="PasswordInput" type="password" onChangeText={(text) => setPassword(text)} />
              <FormControl.ErrorMessage testID="PasswordErrorMessage">{ errors.password }</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.confirmation !== ""}>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input testID="ConfirmationInput" type="password" onChangeText={(text) => setConfirmation(text)} />
              <FormControl.ErrorMessage testID="ConfirmationErrorMessage">{ errors.confirmation }</FormControl.ErrorMessage>
            </FormControl>

            <FormControl w="3/4" maxW="300" isRequired isInvalid>
              <FormControl.Label>Select Role</FormControl.Label>
                <Select testID="DonorSelect" onValueChange={(value) => setRole(value)} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                  bg: "teal.600",
                }} mt="1">
                <Select.Item label="donor" value="donor" />
                <Select.Item label="owner" value="owner" />
                </Select>
                <FormControl.ErrorMessage>
                  Please make a selection!
                </FormControl.ErrorMessage>
            </FormControl>


            {role == 'owner' && <SelectFoodBank setBank={setBank} />}
      
            <Button testID="SignUpButton" mt="2" backgroundColor="lime.600" onPress={onSubmit}>
              Sign up
            </Button>
          </VStack>

        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignUpScreen;
