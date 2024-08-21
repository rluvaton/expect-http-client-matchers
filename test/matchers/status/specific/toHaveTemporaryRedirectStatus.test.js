const { toHaveTemporaryRedirectStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveTemporaryRedirectStatus });

describe('(.not).toHaveTemporaryRedirectStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveTemporaryRedirectStatus', () => {
        test('passes when response has status code TEMPORARY_REDIRECT (307)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 307,
          });

          expect(response).toHaveTemporaryRedirectStatus();
          expect({ response }).toEqual({
            response: expect.toHaveTemporaryRedirectStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 307) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveTemporaryRedirectStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveTemporaryRedirectStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveTemporaryRedirectStatus', () => {
        test('passes when given status code 200 to 599 except 307', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 307) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveTemporaryRedirectStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveTemporaryRedirectStatus(),
            });
          }
        });

        test(`fails when response have status code 307`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 307,
          });

          try {
            expect(response).not.toHaveTemporaryRedirectStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveTemporaryRedirectStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
