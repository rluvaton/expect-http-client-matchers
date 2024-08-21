const { toHaveFailedDependencyStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveFailedDependencyStatus });

describe('(.not).toHaveFailedDependencyStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveFailedDependencyStatus', () => {
        test('passes when response has status code FAILED_DEPENDENCY (424)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 424,
          });

          expect(response).toHaveFailedDependencyStatus();
          expect({ response }).toEqual({
            response: expect.toHaveFailedDependencyStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 424) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveFailedDependencyStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveFailedDependencyStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveFailedDependencyStatus', () => {
        test('passes when given status code 200 to 599 except 424', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 424) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveFailedDependencyStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveFailedDependencyStatus(),
            });
          }
        });

        test(`fails when response have status code 424`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 424,
          });

          try {
            expect(response).not.toHaveFailedDependencyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveFailedDependencyStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
