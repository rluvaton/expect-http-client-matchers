const { toHaveSwitchingProtocolsStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveSwitchingProtocolsStatus });

describe('(.not).toHaveSwitchingProtocolsStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveSwitchingProtocolsStatus', () => {
        test('passes when response has status code SWITCHING_PROTOCOLS (101)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 101,
          });

          expect(response).toHaveSwitchingProtocolsStatus();
          expect({ response }).toEqual({
            response: expect.toHaveSwitchingProtocolsStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 101) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveSwitchingProtocolsStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveSwitchingProtocolsStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveSwitchingProtocolsStatus', () => {
        test('passes when given status code 200 to 599 except 101', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 101) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveSwitchingProtocolsStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveSwitchingProtocolsStatus(),
            });
          }
        });

        test(`fails when response have status code 101`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 101,
          });

          try {
            expect(response).not.toHaveSwitchingProtocolsStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveSwitchingProtocolsStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
