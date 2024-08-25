const { toHaveInsufficientSpaceOnResourceStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveInsufficientSpaceOnResourceStatus });

describe('(.not).toHaveInsufficientSpaceOnResourceStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveInsufficientSpaceOnResourceStatus', () => {
        test('passes when response has status code INSUFFICIENT_SPACE_ON_RESOURCE (419)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 419,
          });

          expect(response).toHaveInsufficientSpaceOnResourceStatus();
          expect({ response }).toEqual({
            response: expect.toHaveInsufficientSpaceOnResourceStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveInsufficientSpaceOnResourceStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveInsufficientSpaceOnResourceStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveInsufficientSpaceOnResourceStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveInsufficientSpaceOnResourceStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveInsufficientSpaceOnResourceStatus(),
          });
        });

        test(`fails when response have status code 419`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 419,
          });

          try {
            expect(response).not.toHaveInsufficientSpaceOnResourceStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveInsufficientSpaceOnResourceStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
