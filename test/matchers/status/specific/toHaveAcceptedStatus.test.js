const { toHaveAcceptedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveAcceptedStatus });

describe('(.not).toHaveAcceptedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveAcceptedStatus', () => {
        test('passes when response has status code ACCEPTED (202)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 202,
          });

          expect(response).toHaveAcceptedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveAcceptedStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 202) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveAcceptedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveAcceptedStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveAcceptedStatus', () => {
        test('passes when given status code 200 to 599 except 202', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 202) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveAcceptedStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveAcceptedStatus(),
            });
          }
        });

        test(`fails when response have status code 202`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 202,
          });

          try {
            expect(response).not.toHaveAcceptedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveAcceptedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
