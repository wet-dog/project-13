import {
  FormControl,
  Center,
  Box,
  Heading,
  VStack,
  Input,
  Button,
  NativeBaseProvider
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";

import { signUp, validateSignUp, Errors, checkErrors } from "../../registration";

type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, "SignUpScreen">;

function SignInScreen({ navigation }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [errors, setErrors] = useState<Errors>({email: "", password: "", confirmation: ""});

  function onSubmit() {
    let errors = validateSignUp(email, password, confirmation);
    setErrors(errors);

    if (checkErrors(errors)) {
      signUp(email, password);
      navigation.navigate("SignInScreen");
    } else {
      console.log("Validation Failed.");
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
              <Input onChangeText={text => setEmail(text)} />
              <FormControl.ErrorMessage>{ errors.email }</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.password !== ""}>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" onChangeText={text => setPassword(text)} />
              <FormControl.ErrorMessage>{ errors.password }</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.confirmation !== ""}>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type="password" onChangeText={text => setConfirmation(text)} />
              <FormControl.ErrorMessage>{ errors.confirmation }</FormControl.ErrorMessage>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
              Sign up
            </Button>
          </VStack>

        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignInScreen;
