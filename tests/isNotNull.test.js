const {expect, test} = require("@jest/globals");
const _ = require('../dist/utils.js').default;

test('given white space string returns false', () => {
    expect(_.isNotNull('   ')).toBe(false);
});

test('given empty string returns false', () => {
    expect(_.isNotNull('')).toBe(false);
});

test('given not empty string returns true', () => {
    expect(_.isNotNull('sss')).toBe(true);
});

test('given undefined returns false', () => {
    expect(_.isNotNull(undefined)).toBe(false);
});

test('given null returns false', () => {
    expect(_.isNotNull(null)).toBe(false);
});

test('given 0 returns true', () => {
    expect(_.isNotNull(0)).toBe(true);
});

test('given false returns true', () => {
    expect(_.isNotNull(false)).toBe(true);
});

test('given not null object returns true', () => {
    expect(_.isNotNull({})).toBe(true);
});

test('given not empty array returns true', () => {
    expect(_.isNotNull([1,2])).toBe(true);
});

test('given empty array returns false', () => {
    expect(_.isNotNull([])).toBe(false);
});