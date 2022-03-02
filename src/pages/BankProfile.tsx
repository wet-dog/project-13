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
import { fetchBank, foodbankUpdate, BankErrors } from "../utils/bankProfile";

function BankProfile() {

  // This will be fetched according to which user is logged in (TODO)
  let foodbankID = "IFPYo5AVGKA8t490xTpl";
  
  // Edit mode variables
  let buttonMessages = ["Edit Details", "Save Changes"];
  const [editMode, setEditMode] = useState(false);

  // Input handlers
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLatitude] = useState("");
  const [long, setLongitude] = useState("");

  // Fetch the relevant data from the database
  useEffect(() => {
    fetchBank(foodbankID).then((data) => {
      setName(data.bankName);
      setDesc(data.description);
      setLatitude(data.location._lat);
      setLongitude(data.location._long);
    });
  }, []);

  // Error and success handlers
  const [errors, setErrors] = useState<BankErrors>({name: "", lat: "", long: ""});
  const [success, setSuccess] = useState("");

  async function onUpdate() {

    //If edit mode is currently not active, then enable it
    if (editMode == false) {
      setEditMode(true);
      setSuccess("");
    } else {
      // Otherwise try to save the details
      let result = await foodbankUpdate(foodbankID, name, desc, lat, long);
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
            <Button mt="2" colorScheme="indigo" onPress={onUpdate}>
              { buttonMessages[editMode ? 1 : 0] }
            </Button>
            <Text textAlign="center">{ success }</Text>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default BankProfile;
