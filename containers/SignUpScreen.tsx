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
import React, { useState, useEffect } from "react";

import { signUp } from "../registration";

function SignInScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [errors, setErrors] = useState({});

  // TODO: Add better validation

  // Validate the sign up form
  function validate() {
    let errors = {};

    // TODO: Replace with individual validate functions
    //       in if statements
    //       Need to be able to test those validation functions
    //       Put validation in a separate file to make testing easier?

    // Add particular error to errors object
    if (email === "") {
      errors = { ...errors, 
        email: "Email is required"
      };
    }
    
    if (password.length < 8) {
      errors = { ...errors, 
        password: "Password is too short"
      };
    }

    if (password !== confirmation) {
      errors = { ...errors, 
        confirmation: "Passwords don't match"
      };
    }

    console.log(errors);
    setErrors(errors);

    // If there are no errors then sign up
    if (Object.keys(errors).length === 0) {
      // TODO: Integrate with registration functions
      //       Get feedback from the registration request
      //       did it go okay? If it failed probably give
      //       an alert
      signUp(email, password);
      return true;
    }

    return false;
  }

  function onSubmit() {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  };
  
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
            <FormControl isRequired isInvalid={"email" in errors}>
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText={text => setEmail(text)} />
              {'email' in errors && <FormControl.ErrorMessage>Choose an email address</FormControl.ErrorMessage>}
            </FormControl>
            <FormControl isRequired isInvalid={"password" in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" onChangeText={text => setPassword(text)} />
              {'password' in errors && <FormControl.ErrorMessage>Use 8 characters or more for your password</FormControl.ErrorMessage>}
            </FormControl>
            <FormControl isRequired isInvalid={"confirmation" in errors}>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type="password" onChangeText={text => setConfirmation(text)} />
              {'confirmation' in errors && <FormControl.ErrorMessage>Those passwords didn't match. Try again.</FormControl.ErrorMessage>}
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
