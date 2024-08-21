const { toHaveConflictStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveConflictStatus });

describe('(.not).toHaveConflictStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveConflictStatus', () => {
        test('passes when response has status code CONFLICT (409)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 409,
          });

          expect(response).toHaveConflictStatus();
          expect({ response }).toEqual({
            response: expect.toHaveConflictStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 409) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveConflictStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveConflictStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveConflictStatus', () => {
        test('passes when given status code 200 to 599 except 409', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 409) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveConflictStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveConflictStatus(),
            });
          }
        });

        test(`fails when response have status code 409`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 409,
          });

          try {
            expect(response).not.toHaveConflictStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveConflictStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
