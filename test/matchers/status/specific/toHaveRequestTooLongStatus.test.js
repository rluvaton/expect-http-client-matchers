const { toHaveRequestTooLongStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveRequestTooLongStatus });

describe('(.not).toHaveRequestTooLongStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestTooLongStatus', () => {
        test('passes when response has status code REQUEST_TOO_LONG (413)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 413,
          });

          expect(response).toHaveRequestTooLongStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 413) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveRequestTooLongStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveRequestTooLongStatus', () => {
        test('passes when given status code 200 to 599 except 413', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 413) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveRequestTooLongStatus();
          }
        });

        test(`fails when response have status code 413`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 413,
          });

          try {
            expect(response).not.toHaveRequestTooLongStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
