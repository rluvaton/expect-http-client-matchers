const { toHaveHttpVersionNotSupportedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveHttpVersionNotSupportedStatus });

describe('(.not).toHaveHttpVersionNotSupportedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveHttpVersionNotSupportedStatus', () => {
        test('passes when response has status code HTTP_VERSION_NOT_SUPPORTED (505)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 505,
          });

          expect(response).toHaveHttpVersionNotSupportedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveHttpVersionNotSupportedStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 505) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveHttpVersionNotSupportedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveHttpVersionNotSupportedStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveHttpVersionNotSupportedStatus', () => {
        test('passes when given status code 200 to 599 except 505', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 505) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveHttpVersionNotSupportedStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveHttpVersionNotSupportedStatus(),
            });
          }
        });

        test(`fails when response have status code 505`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 505,
          });

          try {
            expect(response).not.toHaveHttpVersionNotSupportedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveHttpVersionNotSupportedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
