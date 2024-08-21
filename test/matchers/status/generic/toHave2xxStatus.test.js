const { toHave2xxStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHave2xxStatus });

describe('(.not).toHave2xxStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHave2xxStatus', () => {
        test('passes when given a 2xx status code', async () => {
          for (let i = 200; i <= 299; i++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).toHave2xxStatus();
            expect({ response }).toEqual({
              response: expect.toHave2xxStatus(),
            });
          }
        });

        describe('status 300 to 599', function allTests() {
          for (let status = 300; status <= 599; status++) {
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHave2xxStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHave2xxStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHave2xxStatus', () => {
        test('passes when given status code not in range 200 to 299', async () => {
          for (let i = 300; i <= 599; i++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHave2xxStatus();
            expect({ response }).toEqual({
              response: expect.not.toHave2xxStatus(),
            });
          }
        });

        describe('status 200 to 299', function allTests() {
          for (let status = 200; status <= 299; status++) {
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).not.toHave2xxStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.not.toHave2xxStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });
    });
  }
});
