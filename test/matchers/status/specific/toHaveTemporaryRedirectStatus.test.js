const { matchers } = require('../../../../src');
const { toHaveTemporaryRedirectStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveTemporaryRedirectStatus });

describe('(.not).toHaveTemporaryRedirectStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveTemporaryRedirectStatus', () => {
        test('passes when response has status code TEMPORARY_REDIRECT (307)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 307,
          });

          expect(response).toHaveTemporaryRedirectStatus();
          expect({ response }).toEqual({
            response: expect.toHaveTemporaryRedirectStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveTemporaryRedirectStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveTemporaryRedirectStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveTemporaryRedirectStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveTemporaryRedirectStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveTemporaryRedirectStatus(),
          });
        });

        test(`fails when response have status code 307`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 307,
          });

          try {
            expect(response).not.toHaveTemporaryRedirectStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveTemporaryRedirectStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
