'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function makeControllable(props, state, propsMapping) {
  if (_typeof(props) !== 'object' || _typeof(propsMapping) !== 'object' && typeof propsMapping !== 'string') {
    return null;
  }

  if (typeof propsMapping === 'string') {
    propsMapping = _defineProperty({}, propsMapping, propsMapping);
  }

  var newState = null;
  var propsToCheck = Object.keys(propsMapping);

  for (var i = 0, l = propsToCheck.length; i < l; i++) {
    var currentState = state || {};
    var propKey = propsToCheck[i];
    var stateKey = propsMapping[propKey] || propKey;
    var prop = props[propKey];
    var prevProp = currentState['__makeControllable'] ? currentState['__makeControllable'][propKey] : undefined;

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

module.exports = makeControllable;
