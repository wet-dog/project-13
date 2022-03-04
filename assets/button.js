import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Touchable} from "react-native-web";

export default function FlatButton({text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 5,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: 'green',
        width: 100,
        textAlign: 'center',
        marginLeft: 145,
    },


    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})
