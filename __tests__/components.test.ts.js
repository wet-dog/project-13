import renderer from "react-test-renderer";
import React from "react";
import SelectFoodBank from "../src/components/SelectFoodBank";

describe("SelectFoodBank component test", () => {
    it('SelectFoodBank component test', () => {
        const component = renderer.create(<SelectFoodBank setBank={() => {}}/>).toJSON();
        expect(component).toMatchSnapshot();
    });
});
