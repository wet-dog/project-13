import {
  FormControl,
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Link,
  Button,
  Text,
  NativeBaseProvider
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";

import { auth, signIn, validateSignIn, checkErrors } from "../registration";

type Errors = {
  email: string,
  password: string,
  confirmation?: string
}

type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, "SignInScreen">;

function SignInScreen({ navigation }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({email: "", password: ""});

  async function isOwner() {
    let uid = auth?.currentUser?.uid ?? false;

    if (uid) {
      let docRef = doc(db, "users", uid);
      let docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        let roles = docSnap.data().roles;
        return roles.owner === true;
      }
    }
  }

  async function navigateScreen() {
    if (await isOwner()) {
      navigation.navigate("MapScreen");
    } else {
      navigation.navigate("FoodList");
    }
  }

  async function onSubmit() {
    let errors = validateSignIn(email, password);
    setErrors(errors);

    if (checkErrors(errors)) {
      if (await signIn(email, password)) {
        navigateScreen();
        return;
      }
    }
    
    console.log("Validation Failed.");
  }

  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Welcome
          </Heading>
          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
          </Heading>
      
          <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={errors.email !== ""}>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input onChangeText={text => setEmail(text)} />
            <FormControl.ErrorMessage>{ errors.email }</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.password !== ""}>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={text => setPassword(text)} />
            <FormControl.ErrorMessage>{ errors.password }</FormControl.ErrorMessage>
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
            Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} onPress={() => navigation.navigate("SignUpScreen")}>
            Sign Up
            </Link>
          </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignInScreen;
