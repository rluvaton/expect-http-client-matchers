const { toHaveMovedPermanentlyStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMovedPermanentlyStatus });

describe('(.not).toHaveMovedPermanentlyStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMovedPermanentlyStatus', () => {
        test('passes when response has status code MOVED_PERMANENTLY (301)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 301,
          });

          expect(response).toHaveMovedPermanentlyStatus();
          expect({ response }).toEqual({
            response: expect.toHaveMovedPermanentlyStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveMovedPermanentlyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveMovedPermanentlyStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveMovedPermanentlyStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveMovedPermanentlyStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveMovedPermanentlyStatus(),
          });
        });

        test(`fails when response have status code 301`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 301,
          });

          try {
            expect(response).not.toHaveMovedPermanentlyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveMovedPermanentlyStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
