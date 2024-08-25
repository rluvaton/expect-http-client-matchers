const { toHaveCreatedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveCreatedStatus });

describe('(.not).toHaveCreatedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveCreatedStatus', () => {
        test('passes when response has status code CREATED (201)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 201,
          });

          expect(response).toHaveCreatedStatus();
          expect({ response }).toEqual({
            response: expect.toHaveCreatedStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveCreatedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveCreatedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveCreatedStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveCreatedStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveCreatedStatus(),
          });
        });

        test(`fails when response have status code 201`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 201,
          });

          try {
            expect(response).not.toHaveCreatedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveCreatedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
