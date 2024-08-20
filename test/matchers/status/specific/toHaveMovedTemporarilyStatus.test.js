const { toHaveMovedTemporarilyStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMovedTemporarilyStatus });

describe('(.not).toHaveMovedTemporarilyStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMovedTemporarilyStatus', () => {
        test('passes when response has status code MOVED_TEMPORARILY (302)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 302,
          });

          expect(response).toHaveMovedTemporarilyStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 302) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveMovedTemporarilyStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveMovedTemporarilyStatus', () => {
        test('passes when given status code 200 to 599 except 302', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 302) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveMovedTemporarilyStatus();
          }
        });

        test(`fails when response have status code 302`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 302,
          });

          try {
            expect(response).not.toHaveMovedTemporarilyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
