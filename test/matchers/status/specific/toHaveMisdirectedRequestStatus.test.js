const { toHaveMisdirectedRequestStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMisdirectedRequestStatus });

describe('(.not).toHaveMisdirectedRequestStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMisdirectedRequestStatus', () => {
        test('passes when response has status code MISDIRECTED_REQUEST (421)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 421,
          });

          expect(response).toHaveMisdirectedRequestStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 421) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveMisdirectedRequestStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveMisdirectedRequestStatus', () => {
        test('passes when given status code 200 to 599 except 421', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 421) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveMisdirectedRequestStatus();
          }
        });

        test(`fails when response have status code 421`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 421,
          });

          try {
            expect(response).not.toHaveMisdirectedRequestStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
