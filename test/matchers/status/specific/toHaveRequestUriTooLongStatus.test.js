const { toHaveRequestUriTooLongStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
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
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 414) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveRequestUriTooLongStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveRequestUriTooLongStatus', () => {
        test('passes when given status code 200 to 599 except 414', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 414) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveRequestUriTooLongStatus();
          }
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
        });
      });
    });
  }
});
