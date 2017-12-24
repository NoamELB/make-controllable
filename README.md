# make-controllable
Implementing the exact same **componentWillReceiveProps** over and over again to make Controllable components  can be very repetitive.

**make-controllable** is a function to help make your components Controllable.

**What is Controllable?** Read this: https://medium.com/myheritage-engineering/how-controllable-react-components-maximize-reusability-86e3d233fa8e

This repetitive code:
```js
componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (this.props.value !== value && this.state.value !== value) {
        this.setState({ value });
    }
}
```

Can be shorten to this one line:
```js
componentWillReceiveProps(nextProps) { 
    makeControllable(this, nextProps, 'value');
}
```

Live example here: https://codesandbox.io/s/w0mjk9z63k


# Install
```
npm i -S make-controllable
```

# Usage
Function parameters
```js
import makeControllable from 'make-controllable';

makeControllable(componentInstance, nextProps, propsMapping, newStateCallback?);
```

## Parameters

* **componentInstance** - React.Component, this instance of the component (your component `this`).
* **nextProps** - Object, the next props (componentWillReceiveProps argument).
* **propsMapping** - Object | String, mapping of prop key name to state key name. Or a String for a single prop with the same state key.
* **newStateCallback** - Function, optional, will use this function instead of `componentInstance.setState`.

## Examples

#### Making `this.props.value`Controllable on `this.state.value`:
```js
componentWillReceiveProps(nextProps) { 
    makeControllable(this, nextProps, 'value');
}
```

#### Making `this.props.value` Controllable on `this.state.otherValue`:
```js
componentWillReceiveProps(nextProps) { 
    makeControllable(this, nextProps, {'value': 'otherValue'});
}
```

#### On multiple props:
```js
componentWillReceiveProps(nextProps) { 
    makeControllable(this, nextProps, {
        'value': 'otherValue',
        'value2': 'otherValue2',
    });
}
```

#### Custom `setState` declaration:
```js
componentWillReceiveProps(nextProps) { 
    makeControllable(this, nextProps, 'value', state => {
        // mutate state here
        this.setState(state);
    });
}
```


# License
MIT
