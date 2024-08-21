const { toHaveUnsupportedMediaTypeStatus } = require('../../../../src');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveUnsupportedMediaTypeStatus });

describe('(.not).toHaveUnsupportedMediaTypeStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUnsupportedMediaTypeStatus', () => {
        test('passes when response has status code UNSUPPORTED_MEDIA_TYPE (415)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 415,
          });

          expect(response).toHaveUnsupportedMediaTypeStatus();
          expect({ response }).toEqual({
            response: expect.toHaveUnsupportedMediaTypeStatus(),
          });
        });

        describe('other statuses', function allTests() {
          for (let status = 200; status <= 599; status++) {
            if (status === 415) {
              continue;
            }
            test(`fails when response have status code ${status}`, async (t) => {
              // Should have the assert snapshot assertion
              t.plan(1);

              const response = await testClient.post(`${apiUrl}/status`, {
                status,
              });

              try {
                expect(response).toHaveUnsupportedMediaTypeStatus();
              } catch (e) {
                t.assert.snapshot(e);
              }

              // Not using snapshot in the test as the error will contain the entire response
              // plus dynamic values
              expect(() => {
                expect({ response }).toEqual({
                  response: expect.toHaveUnsupportedMediaTypeStatus(),
                });
              }).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveUnsupportedMediaTypeStatus', () => {
        test('passes when given status code 200 to 599 except 415', async () => {
          for (let i = 200; i <= 599; i++) {
            if (i === 415) {
              continue;
            }
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status: i,
              },
              {},
            );

            expect(response).not.toHaveUnsupportedMediaTypeStatus();

            expect({ response }).toEqual({
              response: expect.not.toHaveUnsupportedMediaTypeStatus(),
            });
          }
        });

        test(`fails when response have status code 415`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 415,
          });

          try {
            expect(response).not.toHaveUnsupportedMediaTypeStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveUnsupportedMediaTypeStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
