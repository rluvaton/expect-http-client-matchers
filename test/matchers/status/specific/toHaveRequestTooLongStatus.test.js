const { matchers } = require('../../../../src');
const { toHaveRequestTooLongStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveRequestTooLongStatus });

describe('(.not).toHaveRequestTooLongStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestTooLongStatus', () => {
        test('passes when response has status code REQUEST_TOO_LONG (413)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 413,
          });

          expect(response).toHaveRequestTooLongStatus();
          expect({ response }).toEqual({
            response: expect.toHaveRequestTooLongStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveRequestTooLongStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveRequestTooLongStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveRequestTooLongStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveRequestTooLongStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveRequestTooLongStatus(),
          });
        });

        test(`fails when response have status code 413`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 413,
          });

          try {
            expect(response).not.toHaveRequestTooLongStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveRequestTooLongStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
