const { toHaveMethodNotAllowedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMethodNotAllowedStatus });

describe('(.not).toHaveMethodNotAllowedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMethodNotAllowedStatus', () => {
        test('passes when response has status code METHOD_NOT_ALLOWED (405)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 405,
          });

          expect(response).toHaveMethodNotAllowedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveMethodNotAllowedStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 405) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveMethodNotAllowedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveMethodNotAllowedStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveMethodNotAllowedStatus', () => {
        test('passes when given status code 200 to 599 except 405', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 405) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveMethodNotAllowedStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveMethodNotAllowedStatus(),
            });
          }
        });

        test(`fails when response have status code 405`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 405,
          });

          try {
            expect(response).not.toHaveMethodNotAllowedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveMethodNotAllowedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
