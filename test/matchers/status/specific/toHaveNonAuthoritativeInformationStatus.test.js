const { toHaveNonAuthoritativeInformationStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNonAuthoritativeInformationStatus });

describe('(.not).toHaveNonAuthoritativeInformationStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNonAuthoritativeInformationStatus', () => {
        test('passes when response has status code NON_AUTHORITATIVE_INFORMATION (203)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 203,
          });

          expect(response).toHaveNonAuthoritativeInformationStatus();
          expect({ response }).toEqual({
            response: expect.toHaveNonAuthoritativeInformationStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveNonAuthoritativeInformationStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveNonAuthoritativeInformationStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveNonAuthoritativeInformationStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveNonAuthoritativeInformationStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveNonAuthoritativeInformationStatus(),
          });
        });

        test(`fails when response have status code 203`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 203,
          });

          try {
            expect(response).not.toHaveNonAuthoritativeInformationStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveNonAuthoritativeInformationStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
