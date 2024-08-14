const { toHave5xxStatus } = require('../../src/index');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../helpers/server-helper.js');
const axios = require('axios');
const { expect } = require('expect');
const { getServerUrl } = require('../helpers/server-helper');

expect.extend({ toHave5xxStatus });

describe('matcher', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  describe('.toHave3xxStatus', () => {
    test('passes when given a 5xx status code', async () => {
      for (let i = 500; i <= 599; i++) {
        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status: i,
          },
          {},
        );

        expect(response).toHave5xxStatus();
      }
    });

    describe('status 200 to 499', function allTests() {
      for (let status = 200; status <= 499; status++) {
        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).toHave5xxStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });

  describe('.not.toHave2xxStatus', () => {
    test('passes when given status code not in range 500 to 599', async () => {
      for (let status = 200; status <= 499; status++) {
        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status,
          },
          {},
        );

        expect(response).not.toHave5xxStatus();
      }
    });

    describe('status 500 to 599', function allTests() {
      for (let status = 500; status <= 599; status++) {
        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).not.toHave5xxStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });
});
