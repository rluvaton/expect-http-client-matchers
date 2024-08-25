const { toHaveLengthRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveLengthRequiredStatus });

describe('(.not).toHaveLengthRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveLengthRequiredStatus', () => {
        test('passes when response has status code LENGTH_REQUIRED (411)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 411,
          });

          expect(response).toHaveLengthRequiredStatus();
          expect({ response }).toEqual({
            response: expect.toHaveLengthRequiredStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveLengthRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveLengthRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveLengthRequiredStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveLengthRequiredStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveLengthRequiredStatus(),
          });
        });

        test(`fails when response have status code 411`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 411,
          });

          try {
            expect(response).not.toHaveLengthRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveLengthRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
