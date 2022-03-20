
import React, { useEffect, useState } from "react";
import { Center, NativeBaseProvider, Text } from "native-base";
import { StyleSheet } from "react-native";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../utils/firebase";

type FoodListEmbedProps = {
  bankId: string,
}

const styles = StyleSheet.create({
  info: {
      marginTop: 5,
      marginLeft: 10,
      textAlign: "center",
      fontSize: 18,
  },
});

function FoodListEmbed(props: FoodListEmbedProps) {

  const foodsRef = collection(db, "food");
  const q = query(foodsRef, where("bankID", "==", props.bankId));

  const [foods, loading, error, snapshot] = useCollectionData(q);

  return (
    <NativeBaseProvider>
      <Center>
        {foods ? foods[0].foods.map((text: string) => 
          <Text style={styles.info}>{text}</Text>
        ) : <Text>nope</Text>}
      </Center>
    </NativeBaseProvider>
    
  );
}

export default FoodListEmbed;
