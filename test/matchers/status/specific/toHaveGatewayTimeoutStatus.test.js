const { toHaveGatewayTimeoutStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveGatewayTimeoutStatus });

describe('(.not).toHaveGatewayTimeoutStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveGatewayTimeoutStatus', () => {
        test('passes when response has status code GATEWAY_TIMEOUT (504)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 504,
          });

          expect(response).toHaveGatewayTimeoutStatus();
          expect({ response }).toEqual({
            response: expect.toHaveGatewayTimeoutStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 504) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveGatewayTimeoutStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveGatewayTimeoutStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveGatewayTimeoutStatus', () => {
        test('passes when given status code 200 to 599 except 504', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 504) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveGatewayTimeoutStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveGatewayTimeoutStatus(),
            });
          }
        });

        test(`fails when response have status code 504`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 504,
          });

          try {
            expect(response).not.toHaveGatewayTimeoutStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveGatewayTimeoutStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
