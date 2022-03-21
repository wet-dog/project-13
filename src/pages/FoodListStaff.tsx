import { Entypo, AntDesign } from "@native-base/icons";
import React, { useEffect, useState } from "react";
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
  Text
} from "native-base";

import { fetchBankID, insertFood, updateFood, userBank } from "../utils/foodListDatabase";

import { auth } from "../utils/registration";
import { LinearGradient } from "expo-linear-gradient";
import SwipeList from "../components/SwipeList";


const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

function FoodList() {
  const [adding, setAdding] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankId, setBankId] = useState("");

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
              {bankName !== "" && <SwipeList bankName={bankName} bankId={bankId} />}
              {adding && <CreateFood setAdding={setAdding} bankName={bankName} />}
            </ScrollView>
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
