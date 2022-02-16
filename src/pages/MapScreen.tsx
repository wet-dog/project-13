import React from "react";
import { 
  NativeBaseProvider, 
  Center, 
  VStack, 
  Heading 
} from "native-base";

function MapScreen() {
  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="lg">Map Screen</Heading>
        </VStack>
      </Center>
    </NativeBaseProvider>
  ); 
}

export default MapScreen;
