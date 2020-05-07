const {expect, test} = require("@jest/globals");
const _ = require('../dist/utils.js').default;

test('given white space string returns true', () => {
    expect(_.isNull('   ')).toBe(true);
});

test('given empty string returns true', () => {
    expect(_.isNull('')).toBe(true);
});

test('given not empty string returns false', () => {
    expect(_.isNull('sss')).toBe(false);
});

test('given undefined returns true', () => {
    expect(_.isNull(undefined)).toBe(true);
});

test('given null returns true', () => {
    expect(_.isNull(null)).toBe(true);
});

test('given 0 returns false', () => {
    expect(_.isNull(0)).toBe(false);
});

test('given true returns false', () => {
    expect(_.isNull(true)).toBe(false);
});

test('given not null object returns false', () => {
    expect(_.isNull({})).toBe(false);
});

test('given not empty array returns false', () => {
    expect(_.isNull([1,2])).toBe(false);
});

test('given empty array returns true', () => {
    expect(_.isNull([])).toBe(true);
});