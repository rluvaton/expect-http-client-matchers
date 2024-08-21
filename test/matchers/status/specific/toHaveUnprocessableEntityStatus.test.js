const { toHaveUnprocessableEntityStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveUnprocessableEntityStatus });

describe('(.not).toHaveUnprocessableEntityStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUnprocessableEntityStatus', () => {
        test('passes when response has status code UNPROCESSABLE_ENTITY (422)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 422,
          });

          expect(response).toHaveUnprocessableEntityStatus();
          expect({ response }).toEqual({
            response: expect.toHaveUnprocessableEntityStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 422) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveUnprocessableEntityStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveUnprocessableEntityStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveUnprocessableEntityStatus', () => {
        test('passes when given status code 200 to 599 except 422', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 422) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveUnprocessableEntityStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveUnprocessableEntityStatus(),
            });
          }
        });

        test(`fails when response have status code 422`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 422,
          });

          try {
            expect(response).not.toHaveUnprocessableEntityStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveUnprocessableEntityStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
