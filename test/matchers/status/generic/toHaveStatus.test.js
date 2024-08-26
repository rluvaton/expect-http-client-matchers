const { matchers } = require('../../../../src');
const { toHaveStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
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
            expect({ response }).toEqual({
              response: expect.toHaveStatus(status),
            });
          }
        });

        test('passes when given correct asymmetric matcher as status', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).toHaveStatus(expect.any(Number));
          expect({ response }).toEqual({
            response: expect.toHaveStatus(expect.any(Number)),
          });
        });

        test('fails when given incorrect asymmetric matcher as status', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          try {
            expect(response).toHaveStatus(expect.any(String));
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveStatus(expect.any(String)),
            }),
          ).toThrowError(JestAssertionError);
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

              expect(() =>
                expect({ response }).toEqual({
                  response: expect.toHaveStatus(status - 1),
                }),
              ).toThrowError(JestAssertionError);
            });
          }
        });
      });

      describe('.not.toHaveStatus', () => {
        test('passes when the actual status is different than the expected status code', async () => {
          for (let status = 200; status <= 599; status++) {
            const response = await testClient.post(
              `${apiUrl}/status`,
              {
                status,
              },
              {},
            );

            expect(response).not.toHaveStatus(status - 1);
            expect({ response }).toEqual({
              response: expect.not.toHaveStatus(status - 1),
            });
          }
        });

        test('passes when given correct asymmetric matcher as status', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveStatus(expect.any(String));
          expect({ response }).toEqual({
            response: expect.not.toHaveStatus(expect.any(String)),
          });
        });

        test('fails when given incorrect asymmetric matcher as status', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          try {
            expect(response).not.toHaveStatus(expect.any(Number));
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveStatus(expect.any(Number)),
            }),
          ).toThrowError(JestAssertionError);
        });

        describe('status 200 to 599', function allTests() {
          for (let status = 200; status <= 599; status++) {
            test(`fails when response have status code ${status} and the actual response status are the same`, async (t) => {
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

              expect(() =>
                expect({ response }).toEqual({
                  response: expect.not.toHaveStatus(status),
                }),
              ).toThrowError(JestAssertionError);
            });
          }
        });
      });
    });
  }
});
