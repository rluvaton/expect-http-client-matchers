const { toHaveNotAcceptableStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNotAcceptableStatus });

describe('(.not).toHaveNotAcceptableStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNotAcceptableStatus', () => {
        test('passes when response has status code NOT_ACCEPTABLE (406)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 406,
          });

          expect(response).toHaveNotAcceptableStatus();
          expect({ response }).toEqual({
            response: expect.toHaveNotAcceptableStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 406) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveNotAcceptableStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveNotAcceptableStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveNotAcceptableStatus', () => {
        test('passes when given status code 200 to 599 except 406', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 406) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveNotAcceptableStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveNotAcceptableStatus(),
            });
          }
        });

        test(`fails when response have status code 406`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 406,
          });

          try {
            expect(response).not.toHaveNotAcceptableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveNotAcceptableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
