const { matchers } = require('../../../../src');
const { toHavePreconditionFailedStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');

expect.extend({ toHavePreconditionFailedStatus });

describe('(.not).toHavePreconditionFailedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHavePreconditionFailedStatus', () => {
        test('passes when response has status code PRECONDITION_FAILED (412)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 412,
          });

          expect(response).toHavePreconditionFailedStatus();
          expect({ response }).toEqual({
            response: expect.toHavePreconditionFailedStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHavePreconditionFailedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHavePreconditionFailedStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHavePreconditionFailedStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHavePreconditionFailedStatus();

          expect({ response }).toEqual({
            response: expect.not.toHavePreconditionFailedStatus(),
          });
        });

        test(`fails when response have status code 412`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 412,
          });

          try {
            expect(response).not.toHavePreconditionFailedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHavePreconditionFailedStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });
    });
  }
});
