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

import { db } from "./firebase";

type RootStackParamList = {
    HomeScreen: undefined;
    Map: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

function HomeScreen({ navigation }: Props) {
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
        <Center
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "blueGray.50" }}
          px={4}
          flex={1}
        >
          <VStack space={5} alignItems="center">
            <Heading size="lg">Test Page</Heading>
            <Text>Firebase example: { text }</Text>
            <Button onPress={() => console.log("hello world")}>Login</Button>
            <Button onPress={() => navigation.navigate("Map")}>Map</Button>
            <Button onPress={() => console.log("hello world")}>Food Bank Profile</Button>
            <Button onPress={() => console.log("hello world")}>Food List</Button>
          </VStack>
        </Center>
      </NativeBaseProvider>
    );
  }

export default HomeScreen;
