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
  Spacer,
  SectionList,
  Input,
  Modal,
  FormControl
} from "native-base";

import * as Location from 'expo-location';

import { SwipeListView } from "react-native-swipe-list-view";
import { fetchFood, foodData, insertFood, updateFood } from "../utils/foodListDatabase";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { collection, doc, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";


function FoodList() {
  const [mode, setMode] = useState("Basic");

  const [adding, setAdding] = useState(false);
  
  return (
    <NativeBaseProvider>
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
              <Basic adding={adding} />
              {adding && <CreateFood setAdding={setAdding} />}
            </ScrollView>
            <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={<AntDesign />} name="plus" size="sm" onPress={() => setAdding(true)} />} />
          </Box>
      </Center>
    </NativeBaseProvider>
  );
}


function EditFood(props) {
  
  const [food, setFood] = useState("");

  const exampleBankName = "Bristol Food Bank";

  async function onEdit() {
    console.log(props.oldFood);
    console.log(food);
    await updateFood(exampleBankName, props.oldFood, food);
    props.setShowModal(false);
  }
  
  return (
    <Center>
      <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Food</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Food</FormControl.Label>
              <Input onChangeText= {text => setFood(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              props.setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button onPress={onEdit
            }>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

function CreateFood(props) {

  const exampleBankName = "Bristol Food Bank";

  const [food, setFood] = useState("");
  
  async function onCreate() {
    await insertFood(exampleBankName, food, false);
    props.setAdding(false);
  }

  return (
    <Box pl="4" pr="5" py="2" h="16">
      <HStack flex="1">
        <Input placeholder="Enter Food" w="100%" maxWidth="300px" onChangeText= {text => setFood(text)} />
        <Pressable w="70" ml="auto"  bg="coolGray.200" justifyContent="center" onPress={onCreate} _pressed={{opacity: 0.5}}>
            <VStack alignItems="center" space={2}>
              <Icon as={<Entypo name="add-to-list" />} size="xs" color="coolGray.800" />
            </VStack>
          </Pressable>
      </HStack>
    </Box>
  );
}

function Basic(props) {

  type FoodList = {
      key: number,
      food: String
  }

  const [listData, setListData] = useState<FoodList[]>([]);

  const exampleUid = "IFPYo5AVGKA8t490xTpl";
  const exampleBankName = "Bristol Food Bank";

  const foodsRef = collection(db, "food");
  const q = query(foodsRef, where("bankID", "==", exampleUid));

  const [foods, loading, error, snapshot] = useCollectionData(q);

  let id = 0;

  const [change, setChange] = useState(true);
  
  const [showModal, setShowModal] = useState(false);

  const [oldFood, setOldFood] = useState("");

  useEffect(() => {
    if (foods) {
      let data: FoodList[] = [];

      foods[0].foods.map((text: String) => {
        id += 1;
        data.push({key: id, food: text});
      })

      setListData(data);
    }
  }, [foods]);

  function closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  function updateRow(rowMap, rowKey, item) {
    closeRow(rowMap, rowKey);
    setShowModal(true);
    setOldFood(item.food);
    setChange(false);
  }

  function deleteRow(rowMap, rowKey, rowValue) {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
    insertFood(exampleBankName, rowValue.food, true);
  }

  function onRowDidOpen(rowKey) {
    console.log("This row opened", rowKey);
  }
  
  type RenderItem = {
    item: FoodList,
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
          <Box pl="4" pr="5" py="2" h="16">
            <HStack alignItems="center" space={3}>
              <VStack>
                <Text color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} bold>
                  {item.food}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  }

  function renderHiddenItem(data, rowMap) {
    return (
      <HStack flex="1" pl="2">
          <Pressable w="70" ml="auto"  bg="coolGray.200" justifyContent="center" onPress={() => updateRow(rowMap, data.item.key, data.item)} _pressed={{
          opacity: 0.5
        }}>
            <VStack alignItems="center" space={2}>
              <Icon as={<Entypo name="edit" />} size="xs" color="coolGray.800" />
              <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                Edit
              </Text>
            </VStack>
          </Pressable>
          <Pressable w="70"  bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key, data.item)} _pressed={{
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
      <EditFood setShowModal={setShowModal} showModal={showModal} oldFood={oldFood} />
    </Box>
  );
}

export default FoodList;
