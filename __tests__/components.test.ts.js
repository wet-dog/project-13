import renderer from "react-test-renderer";
import React from "react";
import SelectFoodBank from "../src/components/SelectFoodBank";
import { NativeBaseProvider } from "native-base";

describe("SelectFoodBank component test", () => {
    it('SelectFoodBank component test', () => {
        const component = renderer.create(<NativeBaseProvider><SelectFoodBank setBank={() => {}}/></NativeBaseProvider>).toJSON();
        expect(component).toMatchSnapshot();
    });
});
