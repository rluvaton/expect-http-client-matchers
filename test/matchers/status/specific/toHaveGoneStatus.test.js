const { toHaveGoneStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveGoneStatus });

describe('(.not).toHaveGoneStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveGoneStatus', () => {
        test('passes when response has status code GONE (410)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 410,
          });

          expect(response).toHaveGoneStatus();
          expect({ response }).toEqual({
            response: expect.toHaveGoneStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 410) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveGoneStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveGoneStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveGoneStatus', () => {
        test('passes when given status code 200 to 599 except 410', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 410) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveGoneStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveGoneStatus(),
            });
          }
        });

        test(`fails when response have status code 410`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 410,
          });

          try {
            expect(response).not.toHaveGoneStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveGoneStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
