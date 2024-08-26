const { matchers } = require('../../../../src');
const { toHaveServiceUnavailableStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveServiceUnavailableStatus });

describe('(.not).toHaveServiceUnavailableStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveServiceUnavailableStatus', () => {
        test('passes when response has status code SERVICE_UNAVAILABLE (503)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 503,
          });

          expect(response).toHaveServiceUnavailableStatus();
          expect({ response }).toEqual({
            response: expect.toHaveServiceUnavailableStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveServiceUnavailableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveServiceUnavailableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveServiceUnavailableStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveServiceUnavailableStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveServiceUnavailableStatus(),
          });
        });

        test(`fails when response have status code 503`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 503,
          });

          try {
            expect(response).not.toHaveServiceUnavailableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveServiceUnavailableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
