const {expect, test} = require("@jest/globals");
const _ = require('../dist/utils.js').default;

test('should cast number 1 to true', () => {
    expect(_.toBool(1)).toBe(true);
});

test('should cast number > 1 to true', () => {
    expect(_.toBool(12)).toBe(true);
});

test('should cast number < 0 to true', () => {
    expect(_.toBool(-12)).toBe(true);
});

test('should cast number 0 to false', () => {
    expect(_.toBool(0)).toBe(false);
});

test('should cast empty string to false', () => {
    expect(_.toBool('')).toBe(false);
});

test('should cast white spaced string to false', () => {
    expect(_.toBool('   ')).toBe(false);
});

test('should cast string to false', () => {
    expect(_.toBool('FaLsE')).toBe(false);
});

test('should cast string to true', () => {
    expect(_.toBool('TrUe')).toBe(true);
});

test('should cast empty array to false', () => {
    expect(_.toBool([])).toBe(false);
});

test('should cast each item of an array to boolean', () => {
    const expected = [true, true, true];
    expect(_.toBool([1,'True',3])).toEqual(expected);
});