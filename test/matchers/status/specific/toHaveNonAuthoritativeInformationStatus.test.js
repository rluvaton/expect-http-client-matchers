const { toHaveNonAuthoritativeInformationStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNonAuthoritativeInformationStatus });

describe('(.not).toHaveNonAuthoritativeInformationStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNonAuthoritativeInformationStatus', () => {
        test('passes when response has status code NON_AUTHORITATIVE_INFORMATION (203)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 203,
          });

          expect(response).toHaveNonAuthoritativeInformationStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 203) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveNonAuthoritativeInformationStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveNonAuthoritativeInformationStatus', () => {
        test('passes when given status code 200 to 599 except 203', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 203) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveNonAuthoritativeInformationStatus();
          }
        });

        test(`fails when response have status code 203`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 203,
          });

          try {
            expect(response).not.toHaveNonAuthoritativeInformationStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
