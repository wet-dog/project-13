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
        <Center
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "blueGray.50" }}
          px={4}
          flex={1}
        >
          <VStack space={5} alignItems="center">
            <Heading size="lg">Map Page</Heading>
          </VStack>
        </Center>
      </NativeBaseProvider>
    ); 
  }

export default MapScreen;
