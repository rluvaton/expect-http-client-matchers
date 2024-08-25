const { toHaveUpgradeRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveUpgradeRequiredStatus });

describe('(.not).toHaveUpgradeRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUpgradeRequiredStatus', () => {
        test('passes when response has status code UPGRADE_REQUIRED (426)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 426,
          });

          expect(response).toHaveUpgradeRequiredStatus();
          expect({ response }).toEqual({
            response: expect.toHaveUpgradeRequiredStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveUpgradeRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveUpgradeRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveUpgradeRequiredStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveUpgradeRequiredStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveUpgradeRequiredStatus(),
          });
        });

        test(`fails when response have status code 426`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 426,
          });

          try {
            expect(response).not.toHaveUpgradeRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveUpgradeRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
