const { matchers } = require('../../../../src');
const { toHaveNotAcceptableStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNotAcceptableStatus });

describe('(.not).toHaveNotAcceptableStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNotAcceptableStatus', () => {
        test('passes when response has status code NOT_ACCEPTABLE (406)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 406,
          });

          expect(response).toHaveNotAcceptableStatus();
          expect({ response }).toEqual({
            response: expect.toHaveNotAcceptableStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveNotAcceptableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveNotAcceptableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveNotAcceptableStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveNotAcceptableStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveNotAcceptableStatus(),
          });
        });

        test(`fails when response have status code 406`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 406,
          });

          try {
            expect(response).not.toHaveNotAcceptableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveNotAcceptableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
