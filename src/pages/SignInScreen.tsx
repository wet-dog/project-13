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
import React, { useState, useEffect, SetStateAction } from "react";
import {v4 as uuidv4} from 'uuid';
import { doc, getDoc } from "firebase/firestore";

import { db } from "../utils/firebase";

import { auth, signIn, Errors } from "../utils/registration";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "SignInScreen">;

function SignInScreen({ navigation }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({email: "", password: ""});
  
  async function getRole(): Promise<string> {
    let {uid} = auth.currentUser!;

    if (uid) {
      let docRef = doc(db, "users", uid);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().roles.owner === true) return "owner";
        if (docSnap.data().roles.staff === true) return "staff";
        if (docSnap.data().roles.donor === true) return "donor";
      }
    }

    return ""
  }

  async function navigateScreen() {
    let role: string = await getRole();
    switch(role) {
      case "owner": navigation.navigate("OwnerScreen"); 
        break;
      case "staff": navigation.navigate("Staff"); 
        break;
      case "donor": navigation.navigate("Donor"); 
        break;
    }
  }

  async function onSubmit() {
    let result = await signIn(email, password);
    if (result == true) {
      navigateScreen()
    } else {
      console.log("Validation Failed.");
      setErrors(result);
    }
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
            <Input onChangeText={(text: SetStateAction<string>) => setEmail(text)} />
            <FormControl.ErrorMessage>{ errors.email }</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.password !== ""}>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={(text: SetStateAction<string>) => setPassword(text)} />
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
