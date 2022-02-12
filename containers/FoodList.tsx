import React from "react";
import { 
    NativeBaseProvider, 
    Center, 
    VStack, 
    Heading 
} from "native-base";

function FoodList() {
    return (
      <NativeBaseProvider>
        <Center px={4} flex={1}>
          <VStack space={5} alignItems="center">
            <Heading size="lg">Food List</Heading>
          </VStack>
        </Center>
      </NativeBaseProvider>
    ); 
  }

export default FoodList;
