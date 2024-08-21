const { toHaveForbiddenStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveForbiddenStatus });

describe('(.not).toHaveForbiddenStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveForbiddenStatus', () => {
        test('passes when response has status code FORBIDDEN (403)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 403,
          });

          expect(response).toHaveForbiddenStatus();
          expect({ response }).toEqual({
            response: expect.toHaveForbiddenStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 403) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveForbiddenStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveForbiddenStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveForbiddenStatus', () => {
        test('passes when given status code 200 to 599 except 403', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 403) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveForbiddenStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveForbiddenStatus(),
            });
          }
        });

        test(`fails when response have status code 403`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 403,
          });

          try {
            expect(response).not.toHaveForbiddenStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveForbiddenStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
