import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";

import firebase from "firebase/app";
import "firebase/firestore";
import {NavigationContainer} from "@react-navigation/native";
import {Button} from "react-native";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-13-8e03f',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const docRef = db.collection('test');

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });


// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}


const Stack = createNativeStackNavigator();

// @ts-ignore
const HomeScreen = ({ navigation }) => {
  return (
      <Button
          title="Go to DonorPage"
          onPress={() =>
              navigation.navigate('Donor Page', { name: 'Donor' })
          }
      />
  );
};
// @ts-ignore
const DonorScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name} page</Text>;
};



const MyStack = () => {
  return (
      <NavigationContainer>
          <NativeBaseProvider>
              <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'Welcome' }}
              />
              <Stack.Screen name="Donor Page" component={DonorScreen} />
            </Stack.Navigator>
          </NativeBaseProvider>
      </NavigationContainer>
  );
};

function App() {

  const [text, setText] = useState("");

  useEffect(() => {
    const subscriber = db
      .collection('test')
      .doc('03GlJwswWlTGyupX5KWE')
      .onSnapshot(documentSnapshot => {
        // console.log(documentSnapshot.data());

        // Need the '?' incase the object is undefined depending on what onSnapshot() returns.
        // Need '??' to provide a fallback value ("") if object is actually undefined.
        setText(documentSnapshot?.data()?.foo ?? "");
      });

  }, []);

  return MyStack();


  // return (
  //     <NavigationContainer>
  //       <NativeBaseProvider>
  //         <Center
  //           _dark={{ bg: "blueGray.900" }}
  //           _light={{ bg: "blueGray.50" }}
  //           px={4}
  //           flex={1}
  //         >
  //           <VStack space={5} alignItems="center">
  //             <Text>{ text }</Text>
  //             <NativeBaseIcon />
  //             <Heading size="lg">Welcome to NativeBase</Heading>
  //             <HStack space={2} alignItems="center">
  //               <Text>Edit</Text>
  //               <Code>App.tsx</Code>
  //               <Text>and save to reload.</Text>
  //             </HStack>
  //             <Link href="https://docs.nativebase.io" isExternal>
  //               <Text color="primary.500" underline fontSize={"xl"}>
  //                 Learn NativeBase
  //               </Text>
  //             </Link>
  //             <ToggleDarkMode />
  //           </VStack>
  //         </Center>
  //       </NativeBaseProvider>
  //     </NavigationContainer>
  // );
}

export default App;
