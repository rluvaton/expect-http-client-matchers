const { toHaveNotImplementedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNotImplementedStatus });

describe('(.not).toHaveNotImplementedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNotImplementedStatus', () => {
        test('passes when response has status code NOT_IMPLEMENTED (501)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 501,
          });

          expect(response).toHaveNotImplementedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveNotImplementedStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveNotImplementedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveNotImplementedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveNotImplementedStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveNotImplementedStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveNotImplementedStatus(),
          });
        });

        test(`fails when response have status code 501`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 501,
          });

          try {
            expect(response).not.toHaveNotImplementedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveNotImplementedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
