import { Entypo, AntDesign, MaterialIcons } from "@native-base/icons";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Center,
  VStack,
  Heading,
  Button,
  Box,
  ScrollView,
  Pressable,
  HStack,
  Fab,
  Icon,
  Input,
  Modal,
  FormControl,
  Text,
  Divider,
  Spacer,
  IconButton
} from "native-base";

import { fetchBankID, insertFood, updateFood, userBank } from "../utils/foodListDatabase";

import { auth } from "../utils/registration";
import { LinearGradient } from "expo-linear-gradient";
import SwipeList from "../components/SwipeList";
import { props } from "cypress/types/bluebird";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../utils/firebase";
import RandomPriority from "../components/RandomPriority";


const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

function EditIcon() { return <Icon as={<MaterialIcons name="edit" />} size="sm" color="coolGray.600" />; }
function DeleteIcon() { return <Icon as={<MaterialIcons name="delete" />} size="sm" color="red.500" />; }
function MoreIcon() { return <Icon as={<MaterialIcons name="more-horiz" />} size="sm" color="coolGray.600" />; }

function FoodItem(props: {
  foodText: string,
  bankName: string,
  setShowModal: (bool: boolean) => void,
  setOldFood: (str: string) => void})
{

  const [showButtons, setShowButtons] = useState(false);

  function onEditPress() {
    setShowButtons(false);
    props.setOldFood(props.foodText);
    props.setShowModal(true);
  }

  function onDeletePress() {
    setShowButtons(false);
    insertFood(props.bankName, props.foodText, true);
  }

  return (
    <>
    <HStack justifyContent="center" alignItems="center" space={3} py="3">
      <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
        {props.foodText}
      </Text>
      <Spacer />
      {!showButtons && <IconButton icon={<MoreIcon />} onPress={() => setShowButtons(true)}></IconButton>}
      {showButtons && <IconButton icon={<EditIcon />} onPress={onEditPress}></IconButton>}
      {showButtons && <IconButton icon={<DeleteIcon />} onPress={onDeletePress}></IconButton>}
    </HStack>
    </>  
  );
}

function FoodList() {
  const [adding, setAdding] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankId, setBankId] = useState("");

  const foodsRef = collection(db, "food");
  const q = query(foodsRef, where("bankID", "==", bankId));

  const [foods, loading, error, snapshot] = useCollectionData(q);

  const [foodList, setFoodList] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [oldFood, setOldFood] = useState("");

  useEffect(() => {
    if (foods === undefined || bankId === "") return;

    console.log(foods)

    let data: string[] = [];
    foods[0].foods.map((text: string) => {
      data.push(text);
    });

    setFoodList(data);
  }, [foods]);

  useEffect(() => {
    async function setBankValues() {
      let {uid} = auth.currentUser!;
     
      let bankName = await userBank(uid);
      let bankId = await fetchBankID(bankName);
      setBankName(bankName);
      setBankId(bankId!);
      console.log("bankName: " + bankName);
      console.log("bankId: " + bankId);
    }

    setBankValues();
  }, []);

  return (
    <NativeBaseProvider config={config}>
      <Center h="100%">
          <Box bg={{
            linearGradient: {
              colors: ["emerald.700", "tertiary.800"] ,
              start: [0, 0],
              end: [1, 1]
            }}}
            flex="1" safeAreaTop maxW="400px" w="100%"
          >
            <Heading p="4" pb="3" size="lg" color="light.50">
              Food Needed
            </Heading>
            <ScrollView m="2" showsVerticalScrollIndicator={false}>
              <Box p="5" bg="warmGray.200" rounded="sm" mb="2">
                <Heading color="red.700" size="sm" pb="3">HIGH PRIORITY</Heading>
                {foodList.slice(0,1).map((text: string) =>
                  <FoodItem foodText={text} bankName={bankName} setShowModal={setShowModal} setOldFood={setOldFood} />
                )}
                <Divider my={2} bg="coolGray.300" />
                <Heading color="orange.700" size="sm" pb="3" pt="3">MEDIUM PRIORITY</Heading>
                {foodList.slice(1,3).map((text: string) =>
                  <FoodItem foodText={text} bankName={bankName} setShowModal={setShowModal} setOldFood={setOldFood}/>
                )}
                <Divider my={2} bg="coolGray.300" />
                <Heading color="yellow.600" size="sm" pb="3" pt="3">LOW PRIORITY</Heading>
                {foodList.slice(3,).map((text: string) =>
                  <FoodItem foodText={text} bankName={bankName} setShowModal={setShowModal} setOldFood={setOldFood}/>
                )}
              </ Box>
              {adding && <CreateFood setAdding={setAdding} bankName={bankName} />}
            </ScrollView>
            <EditFood bankName={bankName} oldFood={oldFood} showModal={showModal} setShowModal={setShowModal}></EditFood>
            <Fab testID="AddFoodButton" backgroundColor="lime.500" renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={<AntDesign />} name="plus" size="sm" onPress={() => setAdding(true)} />} />
          </Box>
      </Center>
    </NativeBaseProvider>
  );
}


type EditFoodProps = {
  bankName: string,
  oldFood: string,
  showModal: boolean,
  setShowModal: (bool: boolean) => void
}

export function EditFood(props: EditFoodProps) {

  const [food, setFood] = useState("");

  async function onEdit() {
    await updateFood(props.bankName, props.oldFood, food);
    props.setShowModal(false);
  }

  return (
    <Center>
      <Modal testID="AddFoodModal" isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton testID="EditFoodClose" />
          <Modal.Header>Edit Food</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Food</FormControl.Label>
              <Input testID="EditFoodInput" onChangeText= {text => setFood(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button testID="EditFoodCancel" variant="ghost" colorScheme="blueGray" onPress={() => {
              props.setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button testID="EditFoodSave" backgroundColor="lime.500" onPress={onEdit
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


type CreateFoodProps = {
  bankName: string,
  setAdding: (bool: boolean) => void
}

function CreateFood(props: CreateFoodProps) {

  const [food, setFood] = useState("");

  async function onCreate() {
    let capitalizedFood = food.charAt(0).toUpperCase() + food.slice(1);
    await insertFood(props.bankName, capitalizedFood, false);
    props.setAdding(false);
  }

  return (
    <Box pl="4" pr="5" py="2" h="16">
      <HStack flex="1">
        <Input backgroundColor="white" placeholder="Enter Food" w="100%" maxWidth="300px" onChangeText= {text => setFood(text)} />
        <Pressable testID="UploadFoodButton" rounded="sm" w="70" ml="auto"  bg="lime.500" justifyContent="center" onPress={onCreate} _pressed={{opacity: 0.5}}>
            <VStack alignItems="center" space={2}>
              <Icon as={<Entypo name="add-to-list" />} size="xs" color="white" />
            </VStack>
          </Pressable>
      </HStack>
    </Box>
  );
}


export default FoodList;
