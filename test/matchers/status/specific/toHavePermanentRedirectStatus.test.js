const { toHavePermanentRedirectStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHavePermanentRedirectStatus });

describe('(.not).toHavePermanentRedirectStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHavePermanentRedirectStatus', () => {
        test('passes when response has status code PERMANENT_REDIRECT (308)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 308,
          });

          expect(response).toHavePermanentRedirectStatus();
          expect({ response }).toEqual({
            response: expect.toHavePermanentRedirectStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 308) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHavePermanentRedirectStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHavePermanentRedirectStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHavePermanentRedirectStatus', () => {
        test('passes when given status code 200 to 599 except 308', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 308) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHavePermanentRedirectStatus();

            expect({ response }).toEqual({
              response: expect.not.toHavePermanentRedirectStatus(),
            });
          }
        });

        test(`fails when response have status code 308`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 308,
          });

          try {
            expect(response).not.toHavePermanentRedirectStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHavePermanentRedirectStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
