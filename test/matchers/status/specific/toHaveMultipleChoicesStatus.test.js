const { toHaveMultipleChoicesStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMultipleChoicesStatus });

describe('(.not).toHaveMultipleChoicesStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMultipleChoicesStatus', () => {
        test('passes when response has status code MULTIPLE_CHOICES (300)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 300,
          });

          expect(response).toHaveMultipleChoicesStatus();
          expect({ response }).toEqual({
            response: expect.toHaveMultipleChoicesStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 300) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveMultipleChoicesStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveMultipleChoicesStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveMultipleChoicesStatus', () => {
        test('passes when given status code 200 to 599 except 300', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 300) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveMultipleChoicesStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveMultipleChoicesStatus(),
            });
          }
        });

        test(`fails when response have status code 300`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 300,
          });

          try {
            expect(response).not.toHaveMultipleChoicesStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveMultipleChoicesStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
