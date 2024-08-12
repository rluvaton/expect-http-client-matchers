const { toBeSuccessful } = require('../../src/index');
const { describe, test } = require('node:test');
const { HttpStatusCode } = require('axios');
const { expect } = require('expect');

expect.extend(toBeSuccessful);

describe('.toBeSuccessful', () => {
  test('passes when given a successful status code', () => {
    expect(HttpStatusCode.Ok).toBeSuccessful();
  });

  test('fails when not give a successful status code', () => {
    expect(() => expect(HttpStatusCode.InternalServerError).toBeSuccessful()).toThrow();
  });
});

describe('.not.toBeArray', () => {
  test('fails when given a successful status code', () => {
    expect(() => expect(HttpStatusCode.Ok).not.toBeSuccessful()).toThrow();
  });
});
