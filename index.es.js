function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {React.Component} componentInstance
 * @param {Object} nextProps
 * @param {Object|String} propsMapping mapping of prop value to 
 * @param {Function} [newStateCallback] to be called instead of the instance setState with the new state
 */
function makeControllable(componentInstance, nextProps, propsMapping, newStateCallback) {
    if (!componentInstance || !componentInstance.setState || !componentInstance.props || !componentInstance.state || !nextProps || !propsMapping) {
        return;
    }
    if (typeof propsMapping === 'string') {
        propsMapping = _defineProperty({}, propsMapping, propsMapping);
    }

    var newState = {};

    var propsToCheck = Object.keys(propsMapping);
    for (var i = 0, l = propsToCheck.length; i < l; i++) {
        var propKey = propsToCheck[i];
        var stateKey = propsMapping[propKey] || propKey;
        var nextProp = nextProps[propKey];
        if (componentInstance.props[propKey] !== nextProp && componentInstance.state[stateKey] !== nextProp) {
            newState[stateKey] = nextProp;
        }
    }

    if (Object.keys(newState).length) {
        newStateCallback ? newStateCallback(newState) : componentInstance.setState(newState);
    }
}

export default makeControllable;
