"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "consoleError",

    /**
     * Print error into the console with some debug data
     * @param {string|object} info - if string than this argument will be put into the console.
     * @param {string} info.message
     * @param {any} info.context
     */
    value: function consoleError(info) {
      if (_typeof(info) === 'object') console.error(info.message, info.context);else console.error(info);
    }
    /**
     * Test value on being null or empty or white space string
     * @param {any} value - tested value
     * @returns {boolean} Returns true when value is null or empty or white space string
     */

  }, {
    key: "isNull",
    value: function isNull(value) {
      // must check explicitly due to the fact that boolean value false is not null.
      if (value === undefined || value === null) return true;

      var sourceType = _typeof(value);

      if (sourceType === 'string') return !value.trim();
      if (sourceType === 'number') return false;
      if (sourceType === 'boolean') return false;
      if (sourceType === 'function') return false;

      if (sourceType === 'object') {
        if (Array.isArray(value)) return !value.length;
      }

      return false;
    }
    /**
     * Test value on not being null or empty or white space string
     * @param {any} value - tested value
     * @returns {boolean} Returns true when value is not null or empty or whitespace
     */

  }, {
    key: "isNotNull",
    value: function isNotNull(value) {
      return !this.isNull(value);
    }
    /**
     * Test an argument on being a function
     * @param {any} test - argument that will be testes on being a function.
     *        May describe a path to an object that has to be tested on being a function.
     *        Path like in a namespace: "someObj.property1.func"
     * @param {object} [context] - from this object path will be applied
     * @param {boolean} [sayError] - if true then if test-argument is not a function, the error message will be printed into the console.
     * @returns {boolean} Returns true when test argument is a function */

  }, {
    key: "isFunction",
    value: function isFunction(test, context, sayError) {
      switch (_typeof(test)) {
        case 'string':
          {
            var obj = context;

            if (context) {
              test.split('.').forEach(function (property) {
                return obj = obj[property];
              });
              if (typeof obj === 'function') return true;
            }

            if (sayError) {
              this.consoleError({
                message: "argument \"".concat(test, "\" is not a function. It's type is ").concat(_typeof(obj)),
                context: {
                  test: test,
                  context: context,
                  lastPropertyValue: obj
                }
              });
            }

            return false;
          }

        case 'function':
          return true;
      }

      if (sayError || typeof context === 'boolean' && context) {
        this.consoleError({
          message: "argument \"".concat(test, "\" is not a function. It's type is ").concat(_typeof(test)),
          context: {
            test: test,
            context: context
          }
        });
      }

      return false;
    }
    /**
     * Test an argument on not being a function
     * @param {any} test - argument that will be testes on being a function.
     *        May describe a path to an object that has to be tested on being a function.
     *        Path like in a namespace: "someObj.property1.func"
     * @param {object} [context] - from this object path will be applied
     * @param {boolean} [sayError] - if true then if test-argument is not a function, the error message will be printed into the console.
     * @returns {boolean} Returns true when test argument is not a function */

  }, {
    key: "isNotFunction",
    value: function isNotFunction(test, context, sayError) {
      return !this.isFunction(test, context, sayError);
    }
    /** Cast an argument to number
     * @param {string|boolean|number|Array} source - if argument is an array than each item of this array will be casted to number
     */

  }, {
    key: "toNumber",
    value: function toNumber(source) {
      if (this.isNull(source)) return 0;

      var sourceType = _typeof(source);

      if (sourceType === 'number') {
        return source;
      }

      if (sourceType === 'string') {
        source = source.replace(/,/g, '.');
        return source.indexOf('.') < 0 ? parseInt(source) : parseFloat(source);
      }

      if (sourceType === 'boolean') {
        return source ? 1 : 0;
      }

      if (Array.isArray(source)) {
        var _self = this;

        var castedSource = source.map(function (item) {
          return _self.toNumber(item);
        });
        return castedSource;
      }

      this.consoleError({
        message: "Can't cast source to number",
        context: {
          source: source,
          sourceType: _typeof(source)
        }
      });
    }
    /** Cast to boolean
     * @param {Array<any>|any} object - argument that will be casted to boolean
     * @param {string} [propertyName] - in case object argument is object type, value of this property will be casted into boolean
     *                                  Value of the property will not be changed; casted value will be returned.
     * @returns {Array<boolean>|boolean>}  boolean value of an object argument
     */

  }, {
    key: "toBool",
    value: function toBool(object, propertyName) {
      var _this = this;

      var value = object;
      if (_typeof(object) === 'object' && typeof propertyName === 'string' && this.isNotNull(propertyName)) value = object[propertyName];

      switch (_typeof(value)) {
        case 'boolean':
          return value;

        case 'string':
          return value.toLowerCase() === 'true';

        case 'number':
          return value !== 0;

        case 'object':
          if (Array.isArray(value)) {
            return value.length ? value.map(function (item) {
              return _this.toBool(item);
            }) : false;
          }

          return value !== null;

        case 'undefined':
          return false;
      }

      this.consoleError({
        message: "No support for type '".concat(_typeof(value), "', can't cast it to boolean"),
        context: {
          arguments: arguments,
          value: value
        }
      });
      return false;
    }
  }]);

  return Utils;
}();

var _default = new Utils();

exports["default"] = _default;