import React from "react";
import ReactDOM from 'react-dom';
import { STATE_VALUE_DIFFERENT, STATE_KEY } from "./validComponent";

export const DEFAULT_PROPS = {};
export const DEFAULT_NEXT_PROPS = {
    [STATE_KEY]: STATE_VALUE_DIFFERENT,    
};

export default function renderTestComponent(Component, props = DEFAULT_PROPS, nextProps = DEFAULT_NEXT_PROPS) {
    let root = document.createElement('div');
    // render once - will mount the component
    ReactDOM.render(<Component {...props} />, root); 
    // render again - will trigger willReceiveProps
    return ReactDOM.render(<Component {...nextProps} />, root);
}