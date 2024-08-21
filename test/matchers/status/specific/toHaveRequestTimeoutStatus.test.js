const { toHaveRequestTimeoutStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveRequestTimeoutStatus });

describe('(.not).toHaveRequestTimeoutStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestTimeoutStatus', () => {
        test('passes when response has status code REQUEST_TIMEOUT (408)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 408,
          });

          expect(response).toHaveRequestTimeoutStatus();
          expect({ response }).toEqual({
            response: expect.toHaveRequestTimeoutStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 408) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveRequestTimeoutStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveRequestTimeoutStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveRequestTimeoutStatus', () => {
        test('passes when given status code 200 to 599 except 408', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 408) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveRequestTimeoutStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveRequestTimeoutStatus(),
            });
          }
        });

        test(`fails when response have status code 408`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 408,
          });

          try {
            expect(response).not.toHaveRequestTimeoutStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveRequestTimeoutStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
