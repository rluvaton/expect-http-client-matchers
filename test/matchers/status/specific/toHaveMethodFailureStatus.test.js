const { toHaveMethodFailureStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMethodFailureStatus });

describe('(.not).toHaveMethodFailureStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMethodFailureStatus', () => {
        test('passes when response has status code METHOD_FAILURE (420)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 420,
          });

          expect(response).toHaveMethodFailureStatus();
          expect({ response }).toEqual({
            response: expect.toHaveMethodFailureStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 420) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveMethodFailureStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveMethodFailureStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveMethodFailureStatus', () => {
        test('passes when given status code 200 to 599 except 420', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 420) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveMethodFailureStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveMethodFailureStatus(),
            });
          }
        });

        test(`fails when response have status code 420`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 420,
          });

          try {
            expect(response).not.toHaveMethodFailureStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveMethodFailureStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
