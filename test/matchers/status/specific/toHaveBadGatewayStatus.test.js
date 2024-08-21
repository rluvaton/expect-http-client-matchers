const { toHaveBadGatewayStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveBadGatewayStatus });

describe('(.not).toHaveBadGatewayStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveBadGatewayStatus', () => {
        test('passes when response has status code BAD_GATEWAY (502)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 502,
          });

          expect(response).toHaveBadGatewayStatus();
          expect({ response }).toEqual({
            response: expect.toHaveBadGatewayStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 502) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveBadGatewayStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveBadGatewayStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveBadGatewayStatus', () => {
        test('passes when given status code 200 to 599 except 502', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 502) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveBadGatewayStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveBadGatewayStatus(),
            });
          }
        });

        test(`fails when response have status code 502`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 502,
          });

          try {
            expect(response).not.toHaveBadGatewayStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveBadGatewayStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
