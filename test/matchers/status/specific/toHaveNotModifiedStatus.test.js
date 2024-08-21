const { toHaveNotModifiedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNotModifiedStatus });

describe('(.not).toHaveNotModifiedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNotModifiedStatus', () => {
        test('passes when response has status code NOT_MODIFIED (304)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 304,
          });

          expect(response).toHaveNotModifiedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveNotModifiedStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 304) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveNotModifiedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveNotModifiedStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveNotModifiedStatus', () => {
        test('passes when given status code 200 to 599 except 304', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 304) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveNotModifiedStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveNotModifiedStatus(),
            });
          }
        });

        test(`fails when response have status code 304`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 304,
          });

          try {
            expect(response).not.toHaveNotModifiedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveNotModifiedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
