import React from 'react';
import renderer from 'react-test-renderer';
import MapScreen from "../src/pages/MapScreen";
import FlatButton from "../assets/button";

describe('FlatButton renders correctly', () => {
    it('Without text or onPress function', () => {
        const button = renderer.create(<FlatButton />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('With text', () => {
        const button = renderer.create(<FlatButton text={"Some Text"}/>).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('With an onPress function', () => {
        const button = renderer.create(<FlatButton onPress={() => {}} />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('With text and onPress function', () => {
        const button = renderer.create(<FlatButton text={"Some Text"} onPress={() => {}} />).toJSON();
        expect(button).toMatchSnapshot();
    });
});

describe("Map renders correctly", () => {
    it("Map matches snapshot", () => {
        const map = renderer.create(<MapScreen renderImages={false}/>).toJSON();
        expect(map).toMatchSnapshot();
    });
});

/*import MapScreen from "../src/pages/MapScreen";
import renderer from 'react-test-renderer';
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";*/

/*const React = require("react");
const renderer = require('react-test-renderer');
const MapScreen = require("../src/pages/MapScreen");*/
// const {createBottomTabNavigator} = require("@react-navigation/bottom-tabs");

/*describe("Map Rendering", () => {
    // let renderedMap;
    // const Tab = createBottomTabNavigator();
    const component = renderer.create(MapScreen.default())
    console.log(component);

    it("empty test", () => {
        expect(true).toBe(true);
    });*/

    /*beforeAll(() => {
        console.log("Rendering map...");
        // @ts-ignore
        renderedMap = MapScreen({navigation: null});
        console.log("Rendered map!")
    });

    it("Map is a react element", () => {
        expect(renderedMap.props.children).toBeDefined();
    });

    it("Map has header", () => {
        const headerElement = renderedMap.props.children[0];
        expect(headerElement.props.children).toBe("Select a food bank or drop off point");
    });

    it("Map has pins", () => {
        const mapElement = renderedMap.props.children[1];
        expect(mapElement.props.children).toBeDefined();

        const mapPins = mapElement.props.children;
        const redPin = mapPins[0];
        expect(redPin.props.pinColor).toBe("red");
        expect(redPin.props.coordinate.latitude).toBe(51.37952);
        expect(redPin.props.coordinate.longitude).toBe(-2.35717);
        expect(redPin.props.children[0].props.children).toBe("Bath Food Bank");
    })*/
// });
