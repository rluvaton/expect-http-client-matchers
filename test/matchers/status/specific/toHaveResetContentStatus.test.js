const { toHaveResetContentStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveResetContentStatus });

describe('(.not).toHaveResetContentStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveResetContentStatus', () => {
        test('passes when response has status code RESET_CONTENT (205)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 205,
          });

          expect(response).toHaveResetContentStatus();
          expect({ response }).toEqual({
            response: expect.toHaveResetContentStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveResetContentStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveResetContentStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveResetContentStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveResetContentStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveResetContentStatus(),
          });
        });

        test(`fails when response have status code 205`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 205,
          });

          try {
            expect(response).not.toHaveResetContentStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveResetContentStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
