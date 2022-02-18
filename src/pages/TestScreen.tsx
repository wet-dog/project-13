import React, { useState, useEffect } from "react";
import { 
  Button,
  Text,
  NativeBaseProvider, 
  Center, 
  VStack, 
  Heading 
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../utils/firebase";

type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, "TestScreen">;

function TestScreen({ navigation }: Props) {
  const [text, setText] = useState("");

  // Set variable with text from Firebase
  useEffect(() => {
    async function fetchText() {
      let docRef = doc(db, "test", "03GlJwswWlTGyupX5KWE");
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setText(docSnap.data().foo);
      }
    }
  
    fetchText();
  }, []);

  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="lg">Test Page</Heading>
          <Text>Firebase example: { text }</Text>
          <Button onPress={() => navigation.navigate("SignInScreen")}>Sign In</Button>
          <Button onPress={() => navigation.navigate("SignUpScreen")}>Sign Up</Button>
          <Button onPress={() => navigation.navigate("MapScreen")}>Map Screen</Button>
          <Button onPress={() => navigation.navigate("BankProfile")}>Food Bank Profile</Button>
          <Button onPress={() => navigation.navigate("FoodList")}>Food List</Button>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

export default TestScreen;