const { matchers } = require('../../../../src');
const { toHaveLockedStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveLockedStatus });

describe('(.not).toHaveLockedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveLockedStatus', () => {
        test('passes when response has status code LOCKED (423)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 423,
          });

          expect(response).toHaveLockedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveLockedStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveLockedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveLockedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveLockedStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveLockedStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveLockedStatus(),
          });
        });

        test(`fails when response have status code 423`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 423,
          });

          try {
            expect(response).not.toHaveLockedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveLockedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
