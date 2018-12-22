# make-controllable
Implementing the exact same **getDerivedStateFromProps** over and over again to make Controllable components can be very repetitive.

**make-controllable** is a function to help make your components Controllable.

**What is Controllable?** Read this: https://medium.com/myheritage-engineering/how-controllable-react-components-maximize-reusability-86e3d233fa8e

This repetitive code:
```js
static getDerivedStateFromProps(props, state) {
    let newState = null;
    if (props.value !== state.prevValue) {
        newState = { prevValue: props.value };
        if (props.value !== state.value) {
            newState.value = props.value;
        }
    }
    return newState;
}
```

Can be shorten to this one line:
```js
static getDerivedStateFromProps(props, state) {
    return makeControllable(props, state, 'value');
}
```

Live example here: https://codesandbox.io/s/w0mjk9z63k


# Install
```
npm i make-controllable
```

# Usage
Function parameters
```js
import makeControllable from 'make-controllable';

return makeControllable(props, state, propsMapping);
```

## Parameters
* **props** - the 1st argument from `getDerivedStateFromProps`
* **state** - the 2nd argument from `getDerivedStateFromProps`
* **propsMapping** - Object | String, mapping of prop key name to state key name. Or a String for a single prop with the same state key.

## Examples

#### Making `props.value` Controllable on `state.value`:
```js
static getDerivedStateFromProps(props, state) {
    return makeControllable(props, state, 'value');
}
```

#### Making `props.value` Controllable on `state.otherValue`:
```js
static getDerivedStateFromProps(props, state) {
    return makeControllable(props, state, {'value': 'otherValue'});
}
```

#### With multiple props:
```js
static getDerivedStateFromProps(props, state) {
    makeControllable(props, state, {
        'value': 'otherValue',
        'value2': 'otherValue2',
    });
}
```

# License
MIT
