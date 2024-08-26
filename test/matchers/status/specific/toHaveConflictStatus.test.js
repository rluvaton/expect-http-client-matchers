const { matchers } = require('../../../../src');
const { toHaveConflictStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveConflictStatus });

describe('(.not).toHaveConflictStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveConflictStatus', () => {
        test('passes when response has status code CONFLICT (409)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 409,
          });

          expect(response).toHaveConflictStatus();
          expect({ response }).toEqual({
            response: expect.toHaveConflictStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveConflictStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveConflictStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveConflictStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveConflictStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveConflictStatus(),
          });
        });

        test(`fails when response have status code 409`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 409,
          });

          try {
            expect(response).not.toHaveConflictStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveConflictStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
