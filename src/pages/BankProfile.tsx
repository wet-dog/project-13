import React, { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  Center,
  Heading,
  NativeBaseProvider,
  VStack,
  Box,
  Button,
  Text
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { auth } from "../utils/registration";
import {
  fetchBank,
  foodbankUpdate,
  BankErrors,
  getUserRole
} from "../utils/bankprofile";

type RootStackParamList = {
  TestScreen: undefined;
  MapScreen: undefined;
  BankProfile: undefined;
  FoodList: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OwnerScreen: undefined;
}

let accessDenied = (
  <NativeBaseProvider>
    <Center px={4} flex={1}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Access Denied
        </Heading>
        <VStack space={3} mt="5">
          <Text textAlign="center">Please login to view this page.</Text>
        </VStack>
      </Box>
    </Center>
  </NativeBaseProvider>
);

type Props = NativeStackScreenProps<RootStackParamList, "BankProfile">;

function BankProfile({ navigation }: Props) {

  // Edit mode variables
  let buttonMessages = ["Edit Details", "Save Changes"];
  const [canEdit, setCanEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Input handlers
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLatitude] = useState("");
  const [long, setLongitude] = useState("");

  // First check if a user is logged in
  let user = auth.currentUser;
  if (user === null) {
    // User is not logged in, redirect to login page
    navigation.navigate("SignInScreen");
    // Return access denied page (in case user back-navigates from sign in page)
    return accessDenied;
  }

  // Determine the user's role
  getUserRole(user.uid).then((role) => {
    if (role) {
      setCanEdit(true);
    }
  });

  // This is fetched according to which user is logged in
  // Pre-fill the inputs with data from Firebase
  useEffect(() => {
      fetchBank(user!.uid).then((data) => {
        setName(data?.bankName);
        setDesc(data?.description);
        setLatitude(data?.location._lat);
        setLongitude(data?.location._long);
      });
  }, []);

  // Error and success handlers
  const [errors, setErrors] = useState<BankErrors>({name: "", lat: "", long: ""});
  const [success, setSuccess] = useState("");

  async function onUpdate() {
    //If edit mode is currently not active, then enable it
    if (!editMode) {
      setEditMode(true);
      setSuccess("");
    } else {
      // Otherwise try to save the details
      let result = await foodbankUpdate(user!.uid, name, desc, lat, long);
      if (result == true) {
        setErrors({name: "", lat: "", long: ""});
        setSuccess("Changes saved!");
        // Disable edit mode as changes are now saved
        setEditMode(false);
      } else {
        setSuccess("Error! Changes not saved.");
        setErrors(result);
      }
    }
  }

  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            Food Bank Profile
          </Heading>
          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={errors.name !== ""}>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={ name } onChangeText={text => setName(text)} editable={editMode} selectTextOnFocus={editMode}/>
              <FormControl.ErrorMessage>{ errors.name }</FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input value={ desc } onChangeText={text => setDesc(text)} editable={editMode} selectTextOnFocus={editMode}/>
            </FormControl>
            <FormControl isRequired isInvalid={errors.lat !== ""}>
              <FormControl.Label>Latitude</FormControl.Label>
              <Input value={ lat } onChangeText={text => setLatitude(text)} editable={editMode} selectTextOnFocus={editMode}/>
              <FormControl.ErrorMessage>{ errors.lat }</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.long !== ""}>
              <FormControl.Label>Longitude</FormControl.Label>
              <Input value={ long } onChangeText={text => setLongitude(text)} editable={editMode} selectTextOnFocus={editMode}/>
              <FormControl.ErrorMessage>{ errors.long }</FormControl.ErrorMessage>
            </FormControl>
            { canEdit &&
              <Button mt="2" backgroundColor="lime.600" onPress={onUpdate}>
                { buttonMessages[editMode ? 1 : 0] }
              </Button>
            }
            <Text textAlign="center">{ success }</Text>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default BankProfile;
