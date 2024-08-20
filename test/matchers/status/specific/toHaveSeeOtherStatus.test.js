const { toHaveSeeOtherStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveSeeOtherStatus });

describe('(.not).toHaveSeeOtherStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveSeeOtherStatus', () => {
        test('passes when response has status code SEE_OTHER (303)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 303,
          });

          expect(response).toHaveSeeOtherStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 303) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveSeeOtherStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveSeeOtherStatus', () => {
        test('passes when given status code 200 to 599 except 303', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 303) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveSeeOtherStatus();
          }
        });

        test(`fails when response have status code 303`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 303,
          });

          try {
            expect(response).not.toHaveSeeOtherStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
