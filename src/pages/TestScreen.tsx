import React from "react";
import {
  Button,
  NativeBaseProvider,
  Center,
  VStack,
  Heading
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "TestScreen">;

function TestScreen({ navigation }: Props) {
  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="lg">Test Page</Heading>
          <Button onPress={() => navigation.navigate("SignInScreen")}>Sign In</Button>
          <Button onPress={() => navigation.navigate("SignUpScreen")}>Sign Up</Button>
          <Button onPress={() => navigation.navigate("MapScreen")}>Map Screen</Button>
          <Button onPress={() => navigation.navigate("BankProfile")}>Food Bank Profile</Button>
          <Button onPress={() => navigation.navigate("FoodListStaff")}>Food List</Button>
          <Button onPress={() => navigation.navigate("FoodListDonor")}>Food List Donor</Button>
          <Button onPress={() => navigation.navigate("OwnerScreen")}>OwnerScreen</Button>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

export default TestScreen;
