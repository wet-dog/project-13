
import React, { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  Input,
  Center,
  Heading,
  NativeBaseProvider,
  VStack,
  Box,
  Text,
  Button,
  Select,
  CheckIcon
} from "native-base";

import { fetchUserArray } from "../utils/helpers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { setStatusBarHidden } from "expo-status-bar";
import {updateStaff} from '../utils/foodBankDatabase'


type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OwnerScreen: undefined;
}

import {wipeFoodArray, insertFood, updateFood} from '../utils/foodListDatabase'

type Props = NativeStackScreenProps<RootStackParamList, "TestScreen">;

function OwnerScreen({navigation} : Props) {

  const [staffArray, setStaff] = useState<any>(null);
  const [staff, setStaffVal] = useState<any>(null); 

  const addStaff = () => {
      updateStaff(staff);
  }

  useEffect(() => {
    const fetch = async () => {
      let data = await fetchUserArray();
      setStaff(data);
    }
    fetch();
    
  }, [])

  return (
    
    <NativeBaseProvider>
      <Heading size="lg">Owner Screen</Heading>
      <Center px={4} flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <VStack space = {5} alignItems={"center"}>
    
            <Button onPress={() => navigation.navigate("MapScreen")}>Map Screen</Button>
      
            <Button onPress={() => navigation.navigate("FoodList")}>Food List</Button>
          
            <Heading>Add Staff</Heading>
            <Center>
                <Box w="3/4" maxW="300">
                    <Select selectedValue={staff} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setStaffVal(itemValue)}>
                        {

                            staffArray ? staffArray.map((item : any) => <Select.Item label = {`${item}`} value = {`${item}`}/>) : 
                            <Select.Item label = "" value = ""/>
                          
                        }
                    
                    </Select>
                    <Button mt = {4} onPress = {addStaff} >Add Staff Member</Button>
                </Box>
           </Center>
     
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default OwnerScreen;
