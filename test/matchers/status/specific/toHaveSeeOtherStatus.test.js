const { toHaveSeeOtherStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveSeeOtherStatus });

describe('(.not).toHaveSeeOtherStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveSeeOtherStatus', () => {
        test('passes when response has status code SEE_OTHER (303)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 303,
          });

          expect(response).toHaveSeeOtherStatus();
          expect({ response }).toEqual({
            response: expect.toHaveSeeOtherStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveSeeOtherStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveSeeOtherStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveSeeOtherStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveSeeOtherStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveSeeOtherStatus(),
          });
        });

        test(`fails when response have status code 303`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 303,
          });

          try {
            expect(response).not.toHaveSeeOtherStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveSeeOtherStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
