const { toHaveMovedTemporarilyStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMovedTemporarilyStatus });

describe('(.not).toHaveMovedTemporarilyStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMovedTemporarilyStatus', () => {
        test('passes when response has status code MOVED_TEMPORARILY (302)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 302,
          });

          expect(response).toHaveMovedTemporarilyStatus();
          expect({ response }).toEqual({
            response: expect.toHaveMovedTemporarilyStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveMovedTemporarilyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveMovedTemporarilyStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveMovedTemporarilyStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveMovedTemporarilyStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveMovedTemporarilyStatus(),
          });
        });

        test(`fails when response have status code 302`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 302,
          });

          try {
            expect(response).not.toHaveMovedTemporarilyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveMovedTemporarilyStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
