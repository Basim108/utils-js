const {expect, test} = require("@jest/globals");
const _ = require('../dist/utils.js').default;

test('should cast number to number', () => {
    expect(_.toNumber(12)).toBe(12);
});

test('should cast string "1"', () => {
    expect(_.toNumber('1')).toBe(1);
});

test('should cast string to a negative number', () => {
    expect(_.toNumber('-12')).toBe(-12);
});

test('should cast string to +0', () => {
    expect(_.toNumber('+0')).toBe(+0);
});

test('should cast string to -0', () => {
    expect(_.toNumber('-0')).toBe(-0);
});

test('should cast false to 0', () => {
    expect(_.toNumber(false)).toBe(0);
});

test('should cast true to 1', () => {
    expect(_.toNumber(true)).toBe(1);
});

test('should cast string 1.5 to float', () => {
    expect(_.toNumber('1.5')).toBe(1.5);
});

test('should cast string .5 to float', () => {
    expect(_.toNumber('.5')).toBe(0.5);
});

test('should cast each item of an array to number', () => {
    const expected = [1, 2, 3.5];
    expect(_.toNumber([true,'2','3.5'])).toEqual(expected);
});