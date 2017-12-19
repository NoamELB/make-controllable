import { Component } from "react";
import makeControllable from "../index";

export const STATE_KEY = "defaultKey";
export const STATE_VALUE = "defaultValue";
export const STATE_KEY_DIFFERENT = "otherKey";
export const STATE_VALUE_DIFFERENT = "otherValue";

export const DEFAULT_STATE = {
    [STATE_KEY]: STATE_VALUE,
};

export const DEFAULT_MAPPING_KEY = STATE_KEY;

export default class ValidComponent extends Component {
    constructor(props) {
        super(props);

        // if we have the value from the props, use it
        // otherwise, initialize to the default state
        this.state = props[STATE_KEY] 
            ? {[STATE_KEY]: props[STATE_KEY]} 
            : DEFAULT_STATE;
    }

    componentWillReceiveProps(nextProps) {
        makeControllable(this, nextProps, DEFAULT_MAPPING_KEY);
    }

    render() {
        return null;
    }
}