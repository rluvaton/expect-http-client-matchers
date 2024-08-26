const { matchers } = require('../../../../src');
const { toBeSuccessful } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toBeSuccessful });

describe('(.not).toBeSuccessful', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toBeSuccessful', () => {
        test('passes when given a successful status code', async () => {
          for (let i = 200; i <= 299; i++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).toBeSuccessful();
            expect({ response }).toEqual({
              response: expect.toBeSuccessful(),
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
                expect(response).toBeSuccessful();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toBeSuccessful(),
                });
              }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
            });
          }
        });
      });

      describe('.not.toBeSuccessful', () => {
        test('passes when given non successful status code', async () => {
          for (let i = 300; i <= 599; i++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toBeSuccessful();
            expect({ response }).toEqual({
              response: expect.not.toBeSuccessful(),
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
                expect(response).not.toBeSuccessful();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.not.toBeSuccessful(),
                });
              }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
            });
          }
        });
      });
    });
  }
});
