export default function makeControllable(props, state, propsMapping) {
    if (typeof props !== 'object' || (typeof propsMapping !== 'object' && typeof propsMapping !== 'string')) {
        return null;
    }
    if (typeof propsMapping === 'string') {
        propsMapping = {
            [propsMapping]: propsMapping
        };
    }

    let newState = null;

    const propsToCheck = Object.keys(propsMapping);
    for (let i = 0, l = propsToCheck.length; i < l; i++) {
        const currentState = state || {};
        const propKey = propsToCheck[i];
        const stateKey = propsMapping[propKey] || propKey;

        const prop = props[propKey];
        const prevProp = currentState['__makeControllable'] ? currentState['__makeControllable'][propKey] : undefined;

        if (prop !== prevProp) {
            newState = newState || {};
            newState['__makeControllable'] = newState['__makeControllable'] || {};
            newState['__makeControllable'][propKey] = prop;

            if (prop !== currentState[stateKey]) {
                newState[stateKey] = prop;
            }
        }
    }
    return newState;
}