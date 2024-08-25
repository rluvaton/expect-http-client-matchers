const { toHaveImATeapotStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveImATeapotStatus });

describe('(.not).toHaveImATeapotStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveImATeapotStatus', () => {
        test('passes when response has status code IM_A_TEAPOT (418)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 418,
          });

          expect(response).toHaveImATeapotStatus();
          expect({ response }).toEqual({
            response: expect.toHaveImATeapotStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveImATeapotStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveImATeapotStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveImATeapotStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveImATeapotStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveImATeapotStatus(),
          });
        });

        test(`fails when response have status code 418`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 418,
          });

          try {
            expect(response).not.toHaveImATeapotStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveImATeapotStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
