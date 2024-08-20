const { toHaveStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveStatus });

describe('(.not).toHaveStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveStatus', () => {
        test('passes when given any status between 200 and 599', async () => {
          for (let status = 200; status <= 599; status++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status,
              },
              {},
            );

            expect(response).toHaveStatus(status);
          }
        });

        describe('status 200 to 599', function allTests() {
          for (let status = 200; status <= 599; status++) {
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveStatus(status - 1);
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHaveStatus', () => {
        test('passes when the actual status is different to the status code', async () => {
          for (let status = 200; status <= 599; status++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status,
              },
              {},
            );

            expect(response).not.toHaveStatus(status - 1);
          }
        });

        describe('status 200 to 599', function allTests() {
          for (let status = 200; status <= 599; status++) {
            test(`fails when response have status code ${status} and the actual response type is the same`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).not.toHaveStatus(status);
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });
    });
  }
});
