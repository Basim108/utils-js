const {expect, test} = require("@jest/globals");

test('module should export a singleton storage', () => {
    const import1 = require('../dist/utils').default;
    const import2 = require('../dist/utils').default;
    import1.prop1 = 10;
    expect(import2).toHaveProperty('prop1', 10);
});