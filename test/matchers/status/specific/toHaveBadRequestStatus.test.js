const { matchers } = require('../../../../src');
const { toHaveBadRequestStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveBadRequestStatus });

describe('(.not).toHaveBadRequestStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveBadRequestStatus', () => {
        test('passes when response has status code BAD_REQUEST (400)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 400,
          });

          expect(response).toHaveBadRequestStatus();
          expect({ response }).toEqual({
            response: expect.toHaveBadRequestStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveBadRequestStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveBadRequestStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveBadRequestStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveBadRequestStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveBadRequestStatus(),
          });
        });

        test(`fails when response have status code 400`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 400,
          });

          try {
            expect(response).not.toHaveBadRequestStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveBadRequestStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
