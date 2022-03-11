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
        const button = renderer.create(<FlatButton text={"Some Text"} />).toJSON();
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
        const map = renderer.create(<MapScreen renderImages={false} />).toJSON();
        expect(map).toMatchSnapshot();
    });
});
