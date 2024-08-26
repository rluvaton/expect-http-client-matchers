const { matchers } = require('../../../../src');
const { toHaveRequestUriTooLongStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveRequestUriTooLongStatus });

describe('(.not).toHaveRequestUriTooLongStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestUriTooLongStatus', () => {
        test('passes when response has status code REQUEST_URI_TOO_LONG (414)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 414,
          });

          expect(response).toHaveRequestUriTooLongStatus();
          expect({ response }).toEqual({
            response: expect.toHaveRequestUriTooLongStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveRequestUriTooLongStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveRequestUriTooLongStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveRequestUriTooLongStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveRequestUriTooLongStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveRequestUriTooLongStatus(),
          });
        });

        test(`fails when response have status code 414`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 414,
          });

          try {
            expect(response).not.toHaveRequestUriTooLongStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveRequestUriTooLongStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
