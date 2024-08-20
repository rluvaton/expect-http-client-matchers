const { toHaveNotImplementedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNotImplementedStatus });

describe('(.not).toHaveNotImplementedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNotImplementedStatus', () => {
        test('passes when response has status code NOT_IMPLEMENTED (501)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 501,
          });

          expect(response).toHaveNotImplementedStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 501) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveNotImplementedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveNotImplementedStatus', () => {
        test('passes when given status code 200 to 599 except 501', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 501) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveNotImplementedStatus();
          }
        });

        test(`fails when response have status code 501`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 501,
          });

          try {
            expect(response).not.toHaveNotImplementedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
