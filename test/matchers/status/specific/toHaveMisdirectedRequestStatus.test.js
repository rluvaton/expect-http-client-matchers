const { matchers } = require('../../../../src');
const { toHaveMisdirectedRequestStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveMisdirectedRequestStatus });

describe('(.not).toHaveMisdirectedRequestStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveMisdirectedRequestStatus', () => {
        test('passes when response has status code MISDIRECTED_REQUEST (421)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 421,
          });

          expect(response).toHaveMisdirectedRequestStatus();
          expect({ response }).toEqual({
            response: expect.toHaveMisdirectedRequestStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveMisdirectedRequestStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveMisdirectedRequestStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveMisdirectedRequestStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveMisdirectedRequestStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveMisdirectedRequestStatus(),
          });
        });

        test(`fails when response have status code 421`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 421,
          });

          try {
            expect(response).not.toHaveMisdirectedRequestStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveMisdirectedRequestStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
