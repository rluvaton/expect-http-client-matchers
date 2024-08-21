const { toHavePreconditionFailedStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHavePreconditionFailedStatus });

describe('(.not).toHavePreconditionFailedStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHavePreconditionFailedStatus', () => {
        test('passes when response has status code PRECONDITION_FAILED (412)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 412,
          });

          expect(response).toHavePreconditionFailedStatus();
          expect({ response }).toEqual({
            response: expect.toHavePreconditionFailedStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 412) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHavePreconditionFailedStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHavePreconditionFailedStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHavePreconditionFailedStatus', () => {
        test('passes when given status code 200 to 599 except 412', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 412) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHavePreconditionFailedStatus();

            expect({ response }).toEqual({
              response: expect.not.toHavePreconditionFailedStatus(),
            });
          }
        });

        test(`fails when response have status code 412`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 412,
          });

          try {
            expect(response).not.toHavePreconditionFailedStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHavePreconditionFailedStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
