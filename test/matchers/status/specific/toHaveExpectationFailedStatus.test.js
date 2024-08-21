const { toHaveExpectationFailedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveExpectationFailedStatus });

describe('(.not).toHaveExpectationFailedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveExpectationFailedStatus', () => {
        test('passes when response has status code EXPECTATION_FAILED (417)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 417,
          });

          expect(response).toHaveExpectationFailedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveExpectationFailedStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 417) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveExpectationFailedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveExpectationFailedStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveExpectationFailedStatus', () => {
        test('passes when given status code 200 to 599 except 417', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 417) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveExpectationFailedStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveExpectationFailedStatus(),
            });
          }
        });

        test(`fails when response have status code 417`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 417,
          });

          try {
            expect(response).not.toHaveExpectationFailedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveExpectationFailedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
