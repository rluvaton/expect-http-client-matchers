const { toHaveTooManyRequestsStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveTooManyRequestsStatus });

describe('(.not).toHaveTooManyRequestsStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveTooManyRequestsStatus', () => {
        test('passes when response has status code TOO_MANY_REQUESTS (429)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 429,
          });

          expect(response).toHaveTooManyRequestsStatus();
          expect({ response }).toEqual({
            response: expect.toHaveTooManyRequestsStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 429) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveTooManyRequestsStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveTooManyRequestsStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveTooManyRequestsStatus', () => {
        test('passes when given status code 200 to 599 except 429', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 429) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveTooManyRequestsStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveTooManyRequestsStatus(),
            });
          }
        });

        test(`fails when response have status code 429`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 429,
          });

          try {
            expect(response).not.toHaveTooManyRequestsStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveTooManyRequestsStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
