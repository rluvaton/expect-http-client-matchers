const { toHaveMovedPermanentlyStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMovedPermanentlyStatus });

describe('(.not).toHaveMovedPermanentlyStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMovedPermanentlyStatus', () => {
        test('passes when response has status code MOVED_PERMANENTLY (301)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 301,
          });

          expect(response).toHaveMovedPermanentlyStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 301) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveMovedPermanentlyStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveMovedPermanentlyStatus', () => {
        test('passes when given status code 200 to 599 except 301', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 301) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveMovedPermanentlyStatus();
          }
        });

        test(`fails when response have status code 301`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 301,
          });

          try {
            expect(response).not.toHaveMovedPermanentlyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
