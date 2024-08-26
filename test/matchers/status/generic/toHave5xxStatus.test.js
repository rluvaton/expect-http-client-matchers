const { matchers } = require('../../../../src');
const { toHave5xxStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHave5xxStatus });

describe('(.not).toHave5xxStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHave5xxStatus', () => {
        test('passes when given a 5xx status code', async () => {
          for (let i = 500; i <= 599; i++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).toHave5xxStatus();
            expect({ response }).toEqual({
              response: expect.toHave5xxStatus(),
            });
          }
        });

        describe('status 200 to 499', function allTests() {
          for (let status = 200; status <= 499; status++) {
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHave5xxStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHave5xxStatus(),
                });
              }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
            });
          }
        });
      });

      describe('.not.toHave5xxStatus', () => {
        test('passes when given status code not in range 500 to 599', async () => {
          for (let status = 200; status <= 499; status++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status,
              },
              {},
            );

            expect(response).not.toHave5xxStatus();
            expect({ response }).toEqual({
              response: expect.not.toHave5xxStatus(),
            });
          }
        });

        describe('status 500 to 599', function allTests() {
          for (let status = 500; status <= 599; status++) {
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).not.toHave5xxStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.not.toHave5xxStatus(),
                });
              }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
            });
          }
        });
      });
    });
  }
});
