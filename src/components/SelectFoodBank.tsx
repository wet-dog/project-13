import { FormControl, Select } from "native-base";
import React, { useEffect, useState } from "react";

import { collection} from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { db } from "../utils/firebase";

type SelectFoodBankProps = {
  setBank: (bank: string) => void
}

function SelectFoodBank(props: SelectFoodBankProps) {

  const banksRef = collection(db, "foodBank");

  const [banks, loading, error, snapshot] = useCollectionData(banksRef);

  return (
    <FormControl w="3/4" maxW="300" isRequired isInvalid>
      <FormControl.Label>Select Food Bank</FormControl.Label>
      <Select  
        onValueChange={(value) => props.setBank(value)} 
        minWidth="200" 
        accessibilityLabel="Choose Food Bank" 
        placeholder="Choose Food Bank" 
        _selectedItem={{bg: "teal.600",}} 
        mt="1"
      >
      { 
        banks 
        ? banks.map(bank => <Select.Item label={ String(bank.bankName) } value={ String(bank.bankName) } />)
        : <Select.Item label="" value="" />
      }
      </Select>
      <FormControl.ErrorMessage>
        Please make a selection!
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

export default SelectFoodBank;
