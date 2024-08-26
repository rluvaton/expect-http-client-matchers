const { matchers } = require('../../../../src');
const { toHaveProxyAuthenticationRequiredStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveProxyAuthenticationRequiredStatus });

describe('(.not).toHaveProxyAuthenticationRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveProxyAuthenticationRequiredStatus', () => {
        test('passes when response has status code PROXY_AUTHENTICATION_REQUIRED (407)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 407,
          });

          expect(response).toHaveProxyAuthenticationRequiredStatus();
          expect({ response }).toEqual({
            response: expect.toHaveProxyAuthenticationRequiredStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveProxyAuthenticationRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveProxyAuthenticationRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveProxyAuthenticationRequiredStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveProxyAuthenticationRequiredStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveProxyAuthenticationRequiredStatus(),
          });
        });

        test(`fails when response have status code 407`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 407,
          });

          try {
            expect(response).not.toHaveProxyAuthenticationRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveProxyAuthenticationRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
