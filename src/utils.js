class Utils {
    /**
     * Print error into the console with some debug data
     * @param {string|object} info - if string than this argument will be put into the console.
     * @param {string} info.message
     * @param {any} info.context
     */
    consoleError(info) {
        if (typeof info === 'object')
            console.error(info.message, info.context);
        else
            console.error(info);
    }

    /**
     * Test value on being null or empty or white space string
     * @param {any} value - tested value
     * @returns {boolean} Returns true when value is null or empty or white space string
     */
    isNull(value) {
        // must check explicitly due to the fact that boolean value false is not null.
        if (value === undefined || value === null)
            return true;
        const sourceType = typeof value;
        if (sourceType === 'string')
            return !value.trim();
        if (sourceType === 'number')
            return false;
        if (sourceType === 'boolean')
            return false;
        if (sourceType === 'function')
            return false;
        if (sourceType === 'object') {
            if (Array.isArray(value))
                return !value.length;
        }
        return false;
    }

    /**
     * Test value on not being null or empty or white space string
     * @param {any} value - tested value
     * @returns {boolean} Returns true when value is not null or empty or whitespace
     */
    isNotNull(value) {
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
    isFunction(test, context, sayError) {
        switch (typeof test) {
            case 'string': {
                let obj = context;
                if (context) {
                    test.split('.').forEach((property) => obj = obj[property]);
                    if (typeof obj === 'function')
                        return true;
                }
                if (sayError) {
                    this.consoleError({
                        message: `argument "${test}" is not a function. It's type is ${typeof obj}`,
                        context: {test: test, context: context, lastPropertyValue: obj},
                    });
                }
                return false;
            }
            case 'function':
                return true;
        }
        if (sayError || typeof context === 'boolean' && context) {
            this.consoleError({
                message: `argument "${test}" is not a function. It's type is ${typeof test}`,
                context: {test: test, context: context},
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
    isNotFunction(test, context, sayError) {
        return !this.isFunction(test, context, sayError);
    }


    /** Cast an argument to number
     * @param {string|boolean|number|Array} source - if argument is an array than each item of this array will be casted to number
     */
    toNumber(source) {
        if (this.isNull(source))
            return 0;

        const sourceType = typeof source;
        if (sourceType === 'number') {
            return source;
        }
        if (sourceType === 'string') {
            source = source.replace(/,/g, '.');
            return source.indexOf('.') < 0
                ? parseInt(source)
                : parseFloat(source);
        }
        if (sourceType === 'boolean') {
            return source ? 1 : 0;
        }
        if (Array.isArray(source)) {
            const _self = this;
            const castedSource = source.map(function (item) {
                return _self.toNumber(item);
            });
            return castedSource;
        }
        this.consoleError({
            message: "Can't cast source to number",
            context: {source: source, sourceType: typeof source}
        });
    }

    /** Cast to boolean
     * @param {Array<any>|any} object - argument that will be casted to boolean
     * @param {string} [propertyName] - in case object argument is object type, value of this property will be casted into boolean
     *                                  Value of the property will not be changed; casted value will be returned.
     * @returns {Array<boolean>|boolean>}  boolean value of an object argument
     */
    toBool(object, propertyName) {
        let value = object;
        if (typeof object === 'object' && typeof propertyName === 'string' && this.isNotNull(propertyName))
            value = object[propertyName];

        switch (typeof value) {
            case 'boolean'  :
                return value;
            case 'string'   :
                return value.toLowerCase() === 'true';
            case 'number'   :
                return value !== 0;
            case 'object'   :
                if (Array.isArray(value)) {
                    return value.length
                        ? value.map(item => this.toBool(item))
                        : false;
                }

                return value !== null;
            case 'undefined':
                return false;
        }
        this.consoleError({
            message: `No support for type '${typeof value}', can't cast it to boolean`,
            context: {arguments: arguments, value: value}
        });
        return false;
    }
}

export default new Utils();