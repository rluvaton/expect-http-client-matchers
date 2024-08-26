const { matchers } = require('../../../../src');
const { toHaveFailedDependencyStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveFailedDependencyStatus });

describe('(.not).toHaveFailedDependencyStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveFailedDependencyStatus', () => {
        test('passes when response has status code FAILED_DEPENDENCY (424)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 424,
          });

          expect(response).toHaveFailedDependencyStatus();
          expect({ response }).toEqual({
            response: expect.toHaveFailedDependencyStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveFailedDependencyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveFailedDependencyStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveFailedDependencyStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveFailedDependencyStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveFailedDependencyStatus(),
          });
        });

        test(`fails when response have status code 424`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 424,
          });

          try {
            expect(response).not.toHaveFailedDependencyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveFailedDependencyStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
