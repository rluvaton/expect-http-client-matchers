const { toHaveNetworkAuthenticationRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNetworkAuthenticationRequiredStatus });

describe('(.not).toHaveNetworkAuthenticationRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNetworkAuthenticationRequiredStatus', () => {
        test('passes when response has status code NETWORK_AUTHENTICATION_REQUIRED (511)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 511,
          });

          expect(response).toHaveNetworkAuthenticationRequiredStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 511) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveNetworkAuthenticationRequiredStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveNetworkAuthenticationRequiredStatus', () => {
        test('passes when given status code 200 to 599 except 511', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 511) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveNetworkAuthenticationRequiredStatus();
          }
        });

        test(`fails when response have status code 511`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 511,
          });

          try {
            expect(response).not.toHaveNetworkAuthenticationRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
