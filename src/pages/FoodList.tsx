import { Entypo, MaterialIcons, AntDesign } from "@native-base/icons";
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
  Icon,
  Spacer
} from "native-base";

import {test} from '../utils/foodListDatabase'
import * as Location from 'expo-location';

import { SwipeListView } from "react-native-swipe-list-view";
import { fetchFood, FoodData } from "../utils/foodListDatabase";


function FoodList() {
  const [mode, setMode] = useState("Basic");
  
  return (
    <NativeBaseProvider>
      <Center h="290px">
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
            <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={<AntDesign />} name="plus" size="sm" />} />
          </Box>
      </Center>
    </NativeBaseProvider>
  );
}


function Basic() {

  const [listData, setListData] = useState<FoodData[]>([
    {id: "yo", distance: 5, bankName: "Bath Food Bank", foods: ["apples", "oranges"]},
    {id: "hi", distance: 5, bankName: "Bath Food Bank", foods: ["apples", "oranges"]},
  ]);

  useEffect(() => {
    async function getFood() {
      let data = await fetchFood();
      console.log(data);
      setListData(data);
    }

    getFood();
  }, []);

  // useEffect(() => {
  //   console.log(listData);
  //   console.log(listData[0]);
  //   async function fetchMyAPI() {
  //     let response = await fetchFood()
  //     console.log(response)
  //     console.log(response[0])
  //     setListData(response)
  //   }

  //   fetchMyAPI()
  // }, [])

  function closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  function deleteRow(rowMap, rowKey) {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  }

  function onRowDidOpen(rowKey) {
    console.log("This row opened", rowKey);
  }
  
  type RenderItem = {
    item: FoodData,
    index: string
  };

  function renderItem({item, index}: RenderItem) {
    return (
      <Box>
        <Pressable onPress={() => console.log("You touched me")} _dark={{
        bg: "coolGray.800"
      }} _light={{
        bg: "white"
      }}>
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <VStack>
                <Text color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} bold>
                  {item.bankName}
                </Text>
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                  {item.id}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} alignSelf="flex-start">
                {item.distance}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  }

  function renderHiddenItem(data, rowMap) {
    return (
      <HStack flex="1" pl="2">
          <Pressable w="70" ml="auto"  bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
          opacity: 0.5
        }}>
            <VStack alignItems="center" space={2}>
              <Icon as={<Entypo name="edit" />} size="xs" color="coolGray.800" />
              <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                Edit
              </Text>
            </VStack>
          </Pressable>
          <Pressable w="70"  bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
          opacity: 0.5
        }}>
            <VStack alignItems="center" space={2}>
              <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
              <Text color="white" fontSize="xs" fontWeight="medium">
                Delete
              </Text>
            </VStack>
          </Pressable>
        </HStack>
    );
  }

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={"0"} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
    </Box>
  );
}

export default FoodList;
