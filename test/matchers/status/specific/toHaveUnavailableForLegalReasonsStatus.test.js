const { toHaveUnavailableForLegalReasonsStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveUnavailableForLegalReasonsStatus });

describe('(.not).toHaveUnavailableForLegalReasonsStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUnavailableForLegalReasonsStatus', () => {
        test('passes when response has status code UNAVAILABLE_FOR_LEGAL_REASONS (451)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 451,
          });

          expect(response).toHaveUnavailableForLegalReasonsStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 451) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveUnavailableForLegalReasonsStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveUnavailableForLegalReasonsStatus', () => {
        test('passes when given status code 200 to 599 except 451', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 451) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveUnavailableForLegalReasonsStatus();
          }
        });

        test(`fails when response have status code 451`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 451,
          });

          try {
            expect(response).not.toHaveUnavailableForLegalReasonsStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
