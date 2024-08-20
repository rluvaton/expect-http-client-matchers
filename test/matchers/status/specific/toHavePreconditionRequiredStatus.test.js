const { toHavePreconditionRequiredStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHavePreconditionRequiredStatus });

describe('(.not).toHavePreconditionRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHavePreconditionRequiredStatus', () => {
        test('passes when response has status code PRECONDITION_REQUIRED (428)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 428,
          });

          expect(response).toHavePreconditionRequiredStatus();
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 428) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHavePreconditionRequiredStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }
            });
          }
        });
      });

      describe('.not.toHavePreconditionRequiredStatus', () => {
        test('passes when given status code 200 to 599 except 428', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 428) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHavePreconditionRequiredStatus();
          }
        });

        test(`fails when response have status code 428`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 428,
          });

          try {
            expect(response).not.toHavePreconditionRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      });
    });
  }
});
