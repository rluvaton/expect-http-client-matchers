const { toHaveRequestedRangeNotSatisfiableStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveRequestedRangeNotSatisfiableStatus });

describe('(.not).toHaveRequestedRangeNotSatisfiableStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestedRangeNotSatisfiableStatus', () => {
        test('passes when response has status code REQUESTED_RANGE_NOT_SATISFIABLE (416)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 416,
          });

          expect(response).toHaveRequestedRangeNotSatisfiableStatus();
          expect({ response }).toEqual({
            response: expect.toHaveRequestedRangeNotSatisfiableStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 416) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveRequestedRangeNotSatisfiableStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveRequestedRangeNotSatisfiableStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveRequestedRangeNotSatisfiableStatus', () => {
        test('passes when given status code 200 to 599 except 416', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 416) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveRequestedRangeNotSatisfiableStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveRequestedRangeNotSatisfiableStatus(),
            });
          }
        });

        test(`fails when response have status code 416`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 416,
          });

          try {
            expect(response).not.toHaveRequestedRangeNotSatisfiableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveRequestedRangeNotSatisfiableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
