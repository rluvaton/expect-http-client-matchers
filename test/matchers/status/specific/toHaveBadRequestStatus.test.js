const { toHaveBadRequestStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveBadRequestStatus });

describe('(.not).toHaveBadRequestStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveBadRequestStatus', () => {
        test('passes when response has status code BAD_REQUEST (400)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 400,
          });

          expect(response).toHaveBadRequestStatus();
          expect({ response }).toEqual({
            response: expect.toHaveBadRequestStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 400) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveBadRequestStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveBadRequestStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveBadRequestStatus', () => {
        test('passes when given status code 200 to 599 except 400', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 400) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveBadRequestStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveBadRequestStatus(),
            });
          }
        });

        test(`fails when response have status code 400`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 400,
          });

          try {
            expect(response).not.toHaveBadRequestStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveBadRequestStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
