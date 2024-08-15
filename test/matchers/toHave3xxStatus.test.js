const { toHave3xxStatus } = require('../../src/index');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../helpers/server-helper.js');
const axios = require('axios');
const { expect } = require('expect');
const { getServerUrl } = require('../helpers/server-helper');

expect.extend({ toHave3xxStatus });

describe('matcher', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  describe('.toHave3xxStatus', () => {
    test('passes when given a 3xx status code', async () => {
      for (let i = 300; i <= 399; i++) {
        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status: i,
          },
          {},
        );

        expect(response).toHave3xxStatus();
      }
    });

    describe('status 200 to 299 and 400 to 599', function allTests() {
      for (let status = 200; status <= 599; status++) {
        if (status === 300) status = 400;

        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).toHave3xxStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });

  describe('.not.toHave3xxStatus', () => {
    test('passes when given status code not in range 300 to 399', async () => {
      for (let status = 200; status <= 599; status++) {
        if (status === 300) status = 400;

        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status,
          },
          {},
        );

        expect(response).not.toHave3xxStatus();
      }
    });

    describe('status 300 to 399', function allTests() {
      for (let status = 300; status <= 399; status++) {
        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).not.toHave3xxStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });
});
