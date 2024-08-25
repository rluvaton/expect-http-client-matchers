const { toHaveNotFoundStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNotFoundStatus });

describe('(.not).toHaveNotFoundStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNotFoundStatus', () => {
        test('passes when response has status code NOT_FOUND (404)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 404,
          });

          expect(response).toHaveNotFoundStatus();
          expect({ response }).toEqual({
            response: expect.toHaveNotFoundStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveNotFoundStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveNotFoundStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveNotFoundStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveNotFoundStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveNotFoundStatus(),
          });
        });

        test(`fails when response have status code 404`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 404,
          });

          try {
            expect(response).not.toHaveNotFoundStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveNotFoundStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
