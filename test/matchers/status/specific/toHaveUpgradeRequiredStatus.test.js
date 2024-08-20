const { toHaveUpgradeRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveUpgradeRequiredStatus });

describe('(.not).toHaveUpgradeRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUpgradeRequiredStatus', () => {
        test('passes when response has status code UPGRADE_REQUIRED (426)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 426,
          });

          expect(response).toHaveUpgradeRequiredStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 426) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveUpgradeRequiredStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveUpgradeRequiredStatus', () => {
        test('passes when given status code 200 to 599 except 426', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 426) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveUpgradeRequiredStatus();
          }
        });

        test(`fails when response have status code 426`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 426,
          });

          try {
            expect(response).not.toHaveUpgradeRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
