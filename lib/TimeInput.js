"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var Promise = require("promise");

var _require = require("react-pick-2");

var Combobox = _require.Combobox;

var PureRenderMixin = require("react-addons-pure-render-mixin");

var moment = require("moment");

var TimeInput = React.createClass({
  displayName: "TimeInput",

  propTypes: {
    /**
     * A `moment` object for the start of the time range to do completions for.
     * Default is the start of the current day.
     */
    start: React.PropTypes.object,

    /**
     * A `moment` object for the end of the time range to do completions for.
     * Default is the end of the current day.
     */
    end: React.PropTypes.object,

    /**
     * The amount of time between each of the autocompleted times, represented
     * as an object with two properties:
     *   - `unit`: A string with a `moment` time unit, like `minutes`.
     *   - `amount`: A number in that unit.
     * Default is 5 minutes.
     */
    increment: React.PropTypes.shape({
      unit: React.PropTypes.string,
      amount: React.PropTypes.number
    }),

    /**
     * The format of the time shown and parsed in the `<input> box.
     * Default is `'LT'`.
     */
    inputValueFormat: React.PropTypes.string,

    /**
     * The locale to be used for the format of the date. If you absolutely need
     * to override the locale for some reason, use this.
     * Default is the browser's `window.navigator.language` value.
     */
    locale: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      start: moment().startOf("day"),
      end: moment().endOf("day"),
      increment: { amount: 5, unit: "minutes" },
      inputValueFormat: "LT",
      locale: window.navigator.userLanguage || window.navigator.language
    };
  },

  getOptions: function getOptions() {
    var _props$increment = this.props.increment;
    var amount = _props$increment.amount;
    var unit = _props$increment.unit;

    var time = moment(this.props.start).locale(this.props.locale);
    var options = [];

    while (time.isBefore(this.props.end)) {
      options.push(moment(time));
      time.add(amount, unit);
    }

    return options;
  },

  getOptionsForInputValue: function getOptionsForInputValue(inputValue) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (inputValue === "") {
        resolve([]);
        return;
      }

      resolve(_this.getOptions().filter(function (option) {
        return _this.getLabelForOption(option).indexOf(inputValue) === 0;
      }));
    });
  },

  getLabelForOption: function getLabelForOption(option) {
    return option.format(this.props.inputValueFormat);
  },

  render: function render() {
    return React.createElement(Combobox, _extends({}, this.props, { getLabelForOption: this.getLabelForOption, getOptionsForInputValue: this.getOptionsForInputValue }));
  }

});

module.exports = TimeInput;