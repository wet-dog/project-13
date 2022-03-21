
import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Center,
  VStack,
  Heading,
  Text,
  Box,
  ScrollView,
  HStack,
  Spacer,
  Icon,
  Divider
} from "native-base";
import { Entypo, MaterialIcons, AntDesign, Ionicons } from "@native-base/icons";
import { LinearGradient } from 'expo-linear-gradient';

import { fetchFood, foodData } from "../utils/foodListDatabase";
import RandomPriority from "../components/RandomPriority";

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

function FoodListDonor() {
  return (

    <NativeBaseProvider config={config}>

      <Center h="100%">
          <Box bg={{
    linearGradient: {
      colors: ["emerald.700", "tertiary.800"] ,
      start: [0, 0],
      end: [1, 1]
    }}} flex="1" safeAreaTop maxW="400px" w="100%">
            <Heading p="4" pb="3" size="lg" color="light.50">
              Food Needed
            </Heading>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Basic />
            </ScrollView>
          </Box>
          {/* <Button onPress={() => { navigation.navigate("MapScreen")}}>Map</Button>
          <Button>FoodList</Button> */}
      </Center>
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
      setListData(data);
    }

    getFood();
  }, []);

  const boxColors = ["white", "coolGray.50"];

  const priorities = [
    <Icon as={<Ionicons name="arrow-up-circle" />} size="8" color="red.700" />,
    <Icon as={<Ionicons name="caret-up-circle" />} size="8" color="orange.700" />,
    <Icon as={<Ionicons name="remove-circle" />} size="8" color="yellow.600" />
  ];

  return (
    <Box margin="3">
      {listData.map((data, index) =>
        <Box pl="5" pr="7" py="5" bg="warmGray.200" rounded="sm" mb="2">
        <HStack alignItems="center" space={1}>
          <Text color="coolGray.800" _dark={{color: "warmGray.50"}} bold>
            {data.bankName}
          </Text>

          <Spacer />

          <Text fontSize="xs" color="coolGray.800" _dark={{color: "warmGray.50"}} alignSelf="flex-start">
            Priority
          </Text>
        </HStack>
        <Text fontSize="xs" color="coolGray.800" _dark={{color: "warmGray.50"}} pb="3">
          {data.distance.toFixed(2)} miles away
        </Text>
        <VStack>
          {data.foods.map(food =>
            <Box>
            <HStack justifyContent="center" alignItems="center" space={3} py="3">
              <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
              {food}
              </Text>
              <Spacer />
              <RandomPriority></RandomPriority>
            </HStack>
            <Divider my={2} bg="coolGray.300" />
            </ Box>
          )}
        </VStack>
        </Box>
      )}
    </Box>
  );
}

export default FoodListDonor;
