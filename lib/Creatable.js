'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCreatableSelect = exports.defaultProps = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utils = require('./utils');

var _stateManager = require('./stateManager');

var _stateManager2 = _interopRequireDefault(_stateManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var compareOption = function compareOption(inputValue, option) {
  var candidate = inputValue.toLowerCase();
  return option.value.toLowerCase() === candidate || option.label.toLowerCase() === candidate;
};

var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return 'Create "' + inputValue + '"';
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};

var defaultProps = exports.defaultProps = _extends({
  allowCreateWhileLoading: false,
  createOptionPosition: 'last'
}, builtins);

var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
  var _class, _temp, _initialiseProps;

  return _temp = _class = function (_Component) {
    _inherits(Creatable, _Component);

    function Creatable(props) {
      _classCallCheck(this, Creatable);

      var _this = _possibleConstructorReturn(this, (Creatable.__proto__ || Object.getPrototypeOf(Creatable)).call(this, props));

      _initialiseProps.call(_this);

      var newOption = Creatable.getNewOption(props);
      _this.state = {
        newOption: newOption,
        options: Creatable.getFullOptions(props, newOption)
      };
      return _this;
    }

    _createClass(Creatable, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var newOption = this.state.newOption;

        if (
        // this code BREAKS (does not re-render) if formatCreateLabel or getNewOptionData are changed
        Creatable.isValidNewOption(this.props) !== Creatable.isValidNewOption(this.props) || nextProps.inputValue !== this.props.inputValue) {
          newOption = Creatable.getNewOption(nextProps);
        }

        var options = this.state.options;

        if (newOption !== this.state.newOption || nextProps.allowCreateWhileLoading !== this.props.allowCreateWhileLoading || nextProps.createOptionPosition !== this.props.createOptionPosition || nextProps.isLoading !== this.props.isLoading || nextProps.options !== this.props.options) {
          options = Creatable.getFullOptions(nextProps, newOption);
        }

        this.setState({
          newOption: newOption,
          options: options
        });
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.select.focus();
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.select.blur();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var props = _objectWithoutProperties(this.props, []);

        var options = this.state.options;

        return _react2.default.createElement(SelectComponent, _extends({}, props, {
          ref: function ref(_ref) {
            _this2.select = _ref;
          },
          options: options,
          onChange: this.onChange
        }));
      }
    }], [{
      key: 'isValidNewOption',
      value: function isValidNewOption(props) {
        var inputValue = props.inputValue,
            isValidNewOption = props.isValidNewOption,
            value = props.value,
            options = props.options;

        return isValidNewOption(inputValue, (0, _utils.cleanValue)(value), options || []);
      }
    }, {
      key: 'getNewOption',
      value: function getNewOption(props) {
        var formatCreateLabel = props.formatCreateLabel,
            getNewOptionData = props.getNewOptionData,
            inputValue = props.inputValue;


        if (Creatable.isValidNewOption(props)) {
          return getNewOptionData(inputValue, formatCreateLabel(inputValue));
        } else {
          return undefined;
        }
      }
    }, {
      key: 'getFullOptions',
      value: function getFullOptions(props, newOption) {
        var allowCreateWhileLoading = props.allowCreateWhileLoading,
            createOptionPosition = props.createOptionPosition,
            isLoading = props.isLoading,
            rawOptions = props.options;

        var options = rawOptions || [];

        return (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(options)) : [].concat(_toConsumableArray(options), [newOption]) : options;
      }
    }]);

    return Creatable;
  }(_react.Component), _class.defaultProps = defaultProps, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onChange = function (newValue, actionMeta) {
      var _props = _this3.props,
          getNewOptionData = _props.getNewOptionData,
          inputValue = _props.inputValue,
          isMulti = _props.isMulti,
          onChange = _props.onChange,
          onCreateOption = _props.onCreateOption,
          value = _props.value;

      if (actionMeta.action !== 'select-option') {
        return onChange(newValue, actionMeta);
      }
      var newOption = _this3.state.newOption;

      var valueArray = Array.isArray(newValue) ? newValue : [newValue];

      if (valueArray[valueArray.length - 1] === newOption) {
        if (onCreateOption) onCreateOption(inputValue);else {
          var newOptionData = getNewOptionData(inputValue, inputValue);
          var newActionMeta = { action: 'create-option' };
          if (isMulti) {
            onChange([].concat(_toConsumableArray((0, _utils.cleanValue)(value)), [newOptionData]), newActionMeta);
          } else {
            onChange(newOptionData, newActionMeta);
          }
        }
        return;
      }
      onChange(newValue, actionMeta);
    };
  }, _temp;
};

// TODO: do this in package entrypoint
exports.makeCreatableSelect = makeCreatableSelect;
exports.default = (0, _stateManager2.default)(makeCreatableSelect(_Select2.default));