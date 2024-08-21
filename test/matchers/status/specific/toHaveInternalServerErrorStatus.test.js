const { toHaveInternalServerErrorStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveInternalServerErrorStatus });

describe('(.not).toHaveInternalServerErrorStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveInternalServerErrorStatus', () => {
        test('passes when response has status code INTERNAL_SERVER_ERROR (500)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 500,
          });

          expect(response).toHaveInternalServerErrorStatus();
          expect({ response }).toEqual({
            response: expect.toHaveInternalServerErrorStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 500) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveInternalServerErrorStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveInternalServerErrorStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveInternalServerErrorStatus', () => {
        test('passes when given status code 200 to 599 except 500', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 500) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveInternalServerErrorStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveInternalServerErrorStatus(),
            });
          }
        });

        test(`fails when response have status code 500`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 500,
          });

          try {
            expect(response).not.toHaveInternalServerErrorStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveInternalServerErrorStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
