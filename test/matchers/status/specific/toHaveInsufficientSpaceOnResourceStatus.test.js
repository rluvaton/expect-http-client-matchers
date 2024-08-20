const { toHaveInsufficientSpaceOnResourceStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveInsufficientSpaceOnResourceStatus });

describe('(.not).toHaveInsufficientSpaceOnResourceStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveInsufficientSpaceOnResourceStatus', () => {
        test('passes when response has status code INSUFFICIENT_SPACE_ON_RESOURCE (419)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 419,
          });

          expect(response).toHaveInsufficientSpaceOnResourceStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 419) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveInsufficientSpaceOnResourceStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveInsufficientSpaceOnResourceStatus', () => {
        test('passes when given status code 200 to 599 except 419', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 419) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveInsufficientSpaceOnResourceStatus();
          }
        });

        test(`fails when response have status code 419`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 419,
          });

          try {
            expect(response).not.toHaveInsufficientSpaceOnResourceStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
