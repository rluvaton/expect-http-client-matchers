const { toHaveUnavailableForLegalReasonsStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveUnavailableForLegalReasonsStatus });

describe('(.not).toHaveUnavailableForLegalReasonsStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUnavailableForLegalReasonsStatus', () => {
        test('passes when response has status code UNAVAILABLE_FOR_LEGAL_REASONS (451)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 451,
          });

          expect(response).toHaveUnavailableForLegalReasonsStatus();
          expect({ response }).toEqual({
            response: expect.toHaveUnavailableForLegalReasonsStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveUnavailableForLegalReasonsStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveUnavailableForLegalReasonsStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveUnavailableForLegalReasonsStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveUnavailableForLegalReasonsStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveUnavailableForLegalReasonsStatus(),
          });
        });

        test(`fails when response have status code 451`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 451,
          });

          try {
            expect(response).not.toHaveUnavailableForLegalReasonsStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveUnavailableForLegalReasonsStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
