const {describe, it} = require('node:test');
const {expect} = require('expect');
const {sum} = require('.');

describe('Main', () => {
  it('sum(1, 2) === 3', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
