const { matchers } = require('../../../../src');
const { toHavePartialContentStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');

expect.extend({ toHavePartialContentStatus });

describe('(.not).toHavePartialContentStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHavePartialContentStatus', () => {
        test('passes when response has status code PARTIAL_CONTENT (206)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 206,
          });

          expect(response).toHavePartialContentStatus();
          expect({ response }).toEqual({
            response: expect.toHavePartialContentStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHavePartialContentStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHavePartialContentStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHavePartialContentStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHavePartialContentStatus();

          expect({ response }).toEqual({
            response: expect.not.toHavePartialContentStatus(),
          });
        });

        test(`fails when response have status code 206`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 206,
          });

          try {
            expect(response).not.toHavePartialContentStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHavePartialContentStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });
    });
  }
});
