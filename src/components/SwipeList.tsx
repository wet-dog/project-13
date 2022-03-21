import { Entypo, Ionicons, MaterialIcons } from "@native-base/icons";
import React, { useEffect, useState } from "react";
import {
  VStack, Text, Box, Pressable,
  HStack, Icon, Divider, Spacer
} from "native-base";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { insertFood } from "../utils/foodListDatabase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ListRenderItemInfo } from "react-native";
import { EditFood } from "../pages/FoodListStaff";
import RandomPriority from "./RandomPriority";
import { parse } from "@babel/core";

type SwipeListProps = {
  bankName: string;
  bankId: string;
};

function SwipeList(props: SwipeListProps) {

  type FoodList = {
    key: string;
    food: string;
  };

  let id = "0"; // Had to be a string for SwipeListView
  const [listData, setListData] = useState<FoodList[]>([]);

  const foodsRef = collection(db, "food");
  const q = query(foodsRef, where("bankID", "==", props.bankId));

  const [foods, loading, error, snapshot] = useCollectionData(q);

  const [showModal, setShowModal] = useState(false);
  const [oldFood, setOldFood] = useState("");

  useEffect(() => {
    if (foods) {
      // console.log(foods)
      let data: FoodList[] = [];

      foods[0].foods.map((text: string) => {
        id = String(Number(id) + 1);
        data.push({ key: id, food: text });
      });

      setListData(data);
    }
  }, [foods]);

  function closeRow(rowMap: RowMap<FoodList>, rowKey: string) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  function updateRow(rowMap: RowMap<FoodList>, rowKey: string, rowValue: FoodList) {
    closeRow(rowMap, rowKey);
    setShowModal(true);
    setOldFood(rowValue.food);
  }

  function deleteRow(rowMap: RowMap<FoodList>, rowKey: string, rowValue: FoodList) {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
    insertFood(props.bankName, rowValue.food, true);
  }

  function onRowDidOpen(rowKey: string) {
    console.log("This row opened", rowKey);
  }

  function renderItem({ item }: { item: FoodList; }) {
    return (
      <Pressable paddingTop="5" _dark={{
        bg: "coolGray.800"
      }} _light={{
        bg: "white"
      }}>
        <Box pl="4" pr="5" h="16">
          <HStack alignItems="center" space={3}>
            <Text testID="SwipeListText" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} bold>
              {item.food}
            </Text>
            <Spacer></Spacer>
            <RandomPriority index={parseInt(item.key)}></RandomPriority>
            {/* <Icon as={<Ionicons name="arrow-up-circle" />} size="8" color="red.700" /> */}
          </HStack>
        </Box>
      </Pressable>
    );
  }

  function renderHiddenItem(data: ListRenderItemInfo<FoodList>, rowMap: RowMap<FoodList>) {
    return (
      <HStack flex="1" pl="2">
        <Pressable testID="EditButton" w="70" ml="auto" bg="coolGray.200" justifyContent="center" onPress={() => updateRow(rowMap, data.item.key, data.item)} _pressed={{
          opacity: 0.5
        }}>
          <VStack alignItems="center" space={2}>
            <Icon as={<Entypo name="edit" />} size="xs" color="coolGray.800" />
            <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
              Edit
            </Text>
          </VStack>
        </Pressable>
        <Pressable testID="DeleteButton" w="70" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key, data.item)} _pressed={{
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
    <>
    <Text color="white" alignSelf="flex-end" paddingRight="3" paddingBottom="1">Priority</Text>
    <Box bg="white" flex="1">
      <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={"0"} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
      <EditFood setShowModal={setShowModal} showModal={showModal} oldFood={oldFood} bankName={props.bankName} />
    </Box>
    </>
  );
}

export default SwipeList;
