const { toBeSuccessful } = require('../../src/index');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../helpers/server-helper.js');
const axios = require('axios');
const { expect } = require('expect');
const { getServerUrl } = require('../helpers/server-helper');

expect.extend({ toBeSuccessful });

describe('matcher', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  describe('.toBeSuccessful', () => {
    test('passes when given a successful status code', async () => {
      for (let i = 200; i <= 299; i++) {
        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status: i,
          },
          {},
        );

        expect(response).toBeSuccessful();
      }
    });

    describe('status 300 to 599', function allTests() {
      for (let status = 300; status <= 599; status++) {
        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).toBeSuccessful();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });

  describe('.not.toBeSuccessful', () => {
    test('passes when given non successful status code', async () => {
      for (let i = 300; i <= 599; i++) {
        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status: i,
          },
          {},
        );

        expect(response).not.toBeSuccessful();
      }
    });

    describe('status 200 to 299', function allTests() {
      for (let status = 200; status <= 299; status++) {
        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).not.toBeSuccessful();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });
});
