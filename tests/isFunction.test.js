const {expect, test} = require("@jest/globals");
const _ = require('../dist/utils.js').default;

test('given number returns false', () => {
    expect(_.isFunction(1)).toBe(false);
});

test('given string returns false', () => {
    expect(_.isFunction('sss')).toBe(false);
});

test('given true returns false', () => {
    expect(_.isFunction(true)).toBe(false);
});

test('given false returns false', () => {
    expect(_.isFunction(false)).toBe(false);
});

test('given function returns true', () => {
    expect(_.isFunction(function(x){return x+1;})).toBe(true);
});
test('given arrow function returns true', () => {
    expect(_.isFunction((x)=>x+1)).toBe(true);
});

test('given class returns true', () => {
    class B{}
    expect(_.isFunction(B)).toBe(true);
});

test('given object method returns true', () => {
    const obj = {
        method: function(x){return x+1;}
    }
    expect(_.isFunction('method', obj)).toBe(true);
});

test('given object method in depth of 2 returns true', () => {
    const obj = {
        prop: {
            method: function (x) {
                return x + 1;
            }
        }
    }
    expect(_.isFunction('prop.method', obj)).toBe(true);
});

test('given object property returns false', () => {
    const obj = {
        prop: 'ss'
    }
    expect(_.isFunction('prop', obj)).toBe(false);
});

test('given object property in depth of 2 returns false', () => {
    const obj = {
        prop: {
            innerProp: 10
        }
    }
    expect(_.isFunction('prop.innerProp', obj)).toBe(false);
});