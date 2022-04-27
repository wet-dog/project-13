import { Icon, Text } from "native-base";
import { Ionicons } from "@native-base/icons";
import React from "react";

function xmur3(str: string) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}
  
function mulberry32(a: number) {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// Create xmur3 state:
const seed = xmur3("avacado");
// Output one 32-bit hash to provide the seed for mulberry32.
const rand = mulberry32(seed());

function RandomPriority(props: {index?: number}) {

    const priorities = [
        <Icon as={<Ionicons name="arrow-up-circle" />} size="8" color="red.700" />,
        <Icon as={<Ionicons name="caret-up-circle" />} size="8" color="orange.700" />,
        <Icon as={<Ionicons name="remove-circle" />} size="8" color="yellow.600" />
    ];

    return (
        <>  
            { props.index 
                ? priorities[props.index === 1 ? 0 : props.index % priorities.length]
                : priorities[Math.floor(rand() * priorities.length)]
            }
        </>
    );

    
}

export default RandomPriority;
