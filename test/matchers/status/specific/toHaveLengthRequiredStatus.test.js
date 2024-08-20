const { toHaveLengthRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveLengthRequiredStatus });

describe('(.not).toHaveLengthRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveLengthRequiredStatus', () => {
        test('passes when response has status code LENGTH_REQUIRED (411)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 411,
          });

          expect(response).toHaveLengthRequiredStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 411) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveLengthRequiredStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveLengthRequiredStatus', () => {
        test('passes when given status code 200 to 599 except 411', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 411) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveLengthRequiredStatus();
          }
        });

        test(`fails when response have status code 411`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 411,
          });

          try {
            expect(response).not.toHaveLengthRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
