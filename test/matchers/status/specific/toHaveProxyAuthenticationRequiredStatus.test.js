const { toHaveProxyAuthenticationRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
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
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 407) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveProxyAuthenticationRequiredStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveProxyAuthenticationRequiredStatus', () => {
        test('passes when given status code 200 to 599 except 407', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 407) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveProxyAuthenticationRequiredStatus();
          }
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
        });
      });
    });
  }
});
