const { toHaveCreatedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveCreatedStatus });

describe('(.not).toHaveCreatedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveCreatedStatus', () => {
        test('passes when response has status code CREATED (201)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 201,
          });

          expect(response).toHaveCreatedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveCreatedStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 201) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveCreatedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveCreatedStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveCreatedStatus', () => {
        test('passes when given status code 200 to 599 except 201', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 201) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveCreatedStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveCreatedStatus(),
            });
          }
        });

        test(`fails when response have status code 201`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 201,
          });

          try {
            expect(response).not.toHaveCreatedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveCreatedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
