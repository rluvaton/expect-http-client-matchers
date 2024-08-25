const { toHaveRequestedRangeNotSatisfiableStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveRequestedRangeNotSatisfiableStatus });

describe('(.not).toHaveRequestedRangeNotSatisfiableStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestedRangeNotSatisfiableStatus', () => {
        test('passes when response has status code REQUESTED_RANGE_NOT_SATISFIABLE (416)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 416,
          });

          expect(response).toHaveRequestedRangeNotSatisfiableStatus();
          expect({ response }).toEqual({
            response: expect.toHaveRequestedRangeNotSatisfiableStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveRequestedRangeNotSatisfiableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveRequestedRangeNotSatisfiableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveRequestedRangeNotSatisfiableStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveRequestedRangeNotSatisfiableStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveRequestedRangeNotSatisfiableStatus(),
          });
        });

        test(`fails when response have status code 416`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 416,
          });

          try {
            expect(response).not.toHaveRequestedRangeNotSatisfiableStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveRequestedRangeNotSatisfiableStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
