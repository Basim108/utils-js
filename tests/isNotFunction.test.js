const {expect, test} = require("@jest/globals");
const _ = require('../dist/utils.js').default;

test('given number returns true', () => {
    expect(_.isNotFunction(1)).toBe(true);
});

test('given string returns true', () => {
    expect(_.isNotFunction('sss')).toBe(true);
});

test('given true returns true', () => {
    expect(_.isNotFunction(true)).toBe(true);
});

test('given true returns true', () => {
    expect(_.isNotFunction(true)).toBe(true);
});

test('given function returns false', () => {
    expect(_.isNotFunction(function(x){return x+1;})).toBe(false);
});
test('given arrow function returns false', () => {
    expect(_.isNotFunction((x)=>x+1)).toBe(false);
});

test('given class returns false', () => {
    class B{}
    expect(_.isNotFunction(B)).toBe(false);
});

test('given object method returns false', () => {
    const obj = {
        method: function(x){return x+1;}
    }
    expect(_.isNotFunction('method', obj)).toBe(false);
});

test('given object method in depth of 2 returns false', () => {
    const obj = {
        prop: {
            method: function (x) {
                return x + 1;
            }
        }
    }
    expect(_.isNotFunction('prop.method', obj)).toBe(false);
});

test('given object property returns true', () => {
    const obj = {
        prop: 'ss'
    }
    expect(_.isNotFunction('prop', obj)).toBe(true);
});

test('given object property in depth of 2 returns true', () => {
    const obj = {
        prop: {
            innerProp: 10
        }
    }
    expect(_.isNotFunction('prop.innerProp', obj)).toBe(true);
});