const { toHaveServiceUnavailableStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
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
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 503) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveServiceUnavailableStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveServiceUnavailableStatus', () => {
        test('passes when given status code 200 to 599 except 503', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 503) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveServiceUnavailableStatus();
          }
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
        });
      });
    });
  }
});
