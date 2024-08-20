const { toHaveRequestHeaderFieldsTooLargeStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveRequestHeaderFieldsTooLargeStatus });

describe('(.not).toHaveRequestHeaderFieldsTooLargeStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestHeaderFieldsTooLargeStatus', () => {
        test('passes when response has status code REQUEST_HEADER_FIELDS_TOO_LARGE (431)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 431,
          });

          expect(response).toHaveRequestHeaderFieldsTooLargeStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 431) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveRequestHeaderFieldsTooLargeStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveRequestHeaderFieldsTooLargeStatus', () => {
        test('passes when given status code 200 to 599 except 431', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 431) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveRequestHeaderFieldsTooLargeStatus();
          }
        });

        test(`fails when response have status code 431`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 431,
          });

          try {
            expect(response).not.toHaveRequestHeaderFieldsTooLargeStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
