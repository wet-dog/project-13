
import React, { useEffect, useState } from "react";
import { 
  NativeBaseProvider, 
  Center, 
  VStack, 
  Heading,
  Text,
  Button,
  Box,
  ScrollView,
  Pressable,
  HStack,
  Fab,
  Spacer,
  SectionList
} from "native-base";

import * as Location from 'expo-location';

import { fetchFood, foodData } from "../utils/foodListDatabase";
import { View } from "react-native";

import { Entypo, MaterialIcons, AntDesign } from "@native-base/icons";
import { Icon } from "native-base";
function FoodListDonor({ navigation }: any) {
  return (
     
    <NativeBaseProvider>

<Button onPress={() => { navigation.navigate("MapScreen")}}>Map</Button>
      <Center h="100%">
          <Box _dark={{
          bg: "coolGray.800"
        }} _light={{
          bg: "white"
        }} flex="1" safeAreaTop maxW="400px" w="100%">
            <Heading p="4" pb="3" size="lg">
              Food Needed
            </Heading>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Basic />
            </ScrollView>
          </Box>
      </Center>
      <Button>test</Button>
    </NativeBaseProvider>
    
  );
}


function Basic() {

  const [listData, setListData] = useState<foodData[]>([
    {bankID: "yo", distance: 5, bankName: "Bath Food Bank", foods: ["apples", "oranges"]},
    {bankID: "hi", distance: 5, bankName: "Bath Food Bank", foods: ["apples", "oranges"]},
  ]);

  useEffect(() => {
    async function getFood() {
      let data = await fetchFood();
      console.log(data);
      setListData(data);
    }

    getFood();
  }, []);

  return (
    <Box>
        {listData.map(data => 
            <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
                <VStack>
                    <Text color="coolGray.800" _dark={{color: "warmGray.50"}} bold>
                        {data.bankName}
                    </Text>

                    {data.foods.map(food => 
                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
                            {food}
                        </Text>
                    )}           
                </VStack>
                
                <Spacer />
                
                <Text fontSize="xs" color="coolGray.800" _dark={{color: "warmGray.50"}} alignSelf="flex-start">
                    {data.distance.toFixed(2)} miles away
                </Text>
            </HStack>
            </Box>
        )}        
    </Box>
  );
}

export default FoodListDonor;
