/**
 * @param {React.Component} componentInstance
 * @param {Object} nextProps
 * @param {Object|String} propsMapping mapping of prop value to 
 * @param {Function} [newStateCallback] to be called instead of the instance setState with the new state
 */
export default function makeControllable(componentInstance, nextProps, propsMapping, newStateCallback) {
    if (!componentInstance || !componentInstance.setState || !componentInstance.props || !componentInstance.state || !nextProps || !propsMapping) {
        return;
    }
    if (typeof propsMapping === 'string') {
        propsMapping = {
            [propsMapping]: propsMapping
        };
    }

    let newState = {};

    let propsToCheck = Object.keys(propsMapping);
    for (let i = 0, l = propsToCheck.length; i < l; i++) {
        let propKey = propsToCheck[i];
        let stateKey = propsMapping[propKey] || propKey;
        let nextProp = nextProps[propKey];
        if (componentInstance.props[propKey] !== nextProp &&
            componentInstance.state[stateKey] !== nextProp) {
            newState[stateKey] = nextProp;
        }
    }

    if (Object.keys(newState).length) {
        newStateCallback ? newStateCallback(newState) : componentInstance.setState(newState);
    }
}