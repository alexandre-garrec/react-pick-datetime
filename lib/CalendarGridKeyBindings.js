"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var moment = require("moment");

var KEY_ARROW_DOWN = 40;
var KEY_ARROW_UP = 38;
var KEY_ARROW_LEFT = 37;
var KEY_ARROW_RIGHT = 39;
var KEY_RETURN = 13;
var KEY_ESC = 27;

function onlyCallIfValuePropPassed(fun) {
  return function (props) {
    if (props.value) {
      fun(props);
    }
  };
}

/**
 * We use CalendarGridKeyBindings to represent the keyDown event behavior for
 * components related to the <CalendarGrid> component in `react-pick-datetime`.
 *
 * Theres a few key properties we expext to find in props:
 *
 *    - `value`
 *    - `onChange`
 *    - `onComplete`
 *    - `onCancel`
 */
var CalendarGridKeyBindings = {
  getKeyBindings: function getKeyBindings(props) {
    var _this = this;

    return (function () {
      var _ref = {};

      _defineProperty(_ref, KEY_ARROW_LEFT, _this.changeToPreviousDay);

      _defineProperty(_ref, KEY_ARROW_RIGHT, _this.changeToNextDay);

      _defineProperty(_ref, KEY_ARROW_UP, _this.changeToPreviousWeek);

      _defineProperty(_ref, KEY_ARROW_DOWN, _this.changeToNextWeek);

      _defineProperty(_ref, KEY_RETURN, _this.complete);

      _defineProperty(_ref, KEY_ESC, props.onCancel);

      return _ref;
    })();
  },

  complete: onlyCallIfValuePropPassed(function (props) {
    props.onComplete(props.value);
  }),

  changeToNextDay: onlyCallIfValuePropPassed(function (props) {
    props.onChange(moment(props.value).add(1, "d"));
  }),

  changeToPreviousDay: onlyCallIfValuePropPassed(function (props) {
    props.onChange(moment(props.value).subtract(1, "d"));
  }),

  changeToNextWeek: onlyCallIfValuePropPassed(function (props) {
    props.onChange(moment(props.value).add(1, "w"));
  }),

  changeToPreviousWeek: onlyCallIfValuePropPassed(function (props) {
    props.onChange(moment(props.value).subtract(1, "w"));
  }),

  handleKeyDown: function handleKeyDown(props, event) {
    var binding = this.getKeyBindings(props)[event.keyCode];

    if (binding) {
      event.preventDefault();
      binding(props);
    }
  }
};

module.exports = CalendarGridKeyBindings;