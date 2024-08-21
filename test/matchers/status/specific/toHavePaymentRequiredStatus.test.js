const { toHavePaymentRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHavePaymentRequiredStatus });

describe('(.not).toHavePaymentRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHavePaymentRequiredStatus', () => {
        test('passes when response has status code PAYMENT_REQUIRED (402)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 402,
          });

          expect(response).toHavePaymentRequiredStatus();
          expect({ response }).toEqual({
            response: expect.toHavePaymentRequiredStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 402) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHavePaymentRequiredStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHavePaymentRequiredStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHavePaymentRequiredStatus', () => {
        test('passes when given status code 200 to 599 except 402', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 402) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHavePaymentRequiredStatus();

            expect({ response }).toEqual({
              response: expect.not.toHavePaymentRequiredStatus(),
            });
          }
        });

        test(`fails when response have status code 402`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 402,
          });

          try {
            expect(response).not.toHavePaymentRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHavePaymentRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
