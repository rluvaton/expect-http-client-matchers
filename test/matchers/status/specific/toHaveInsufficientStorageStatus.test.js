const { matchers } = require('../../../../src');
const { toHaveInsufficientStorageStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveInsufficientStorageStatus });

describe('(.not).toHaveInsufficientStorageStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveInsufficientStorageStatus', () => {
        test('passes when response has status code INSUFFICIENT_STORAGE (507)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 507,
          });

          expect(response).toHaveInsufficientStorageStatus();
          expect({ response }).toEqual({
            response: expect.toHaveInsufficientStorageStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveInsufficientStorageStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveInsufficientStorageStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveInsufficientStorageStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveInsufficientStorageStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveInsufficientStorageStatus(),
          });
        });

        test(`fails when response have status code 507`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 507,
          });

          try {
            expect(response).not.toHaveInsufficientStorageStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveInsufficientStorageStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
