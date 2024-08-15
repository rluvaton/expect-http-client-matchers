const { toHave4xxStatus } = require('../../src/index');
const { describe, test, before } = require('node:test');
const { buildServer } = require('../helpers/server-helper.js');
const axios = require('axios');
const { expect } = require('expect');
const { getServerUrl } = require('../helpers/server-helper');

expect.extend({ toHave4xxStatus });

describe('matcher', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  describe('.toHave4xxStatus', () => {
    test('passes when given a 4xx status code', async () => {
      for (let i = 400; i <= 499; i++) {
        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status: i,
          },
          {},
        );

        expect(response).toHave4xxStatus();
      }
    });

    describe('status 200 to 399 and 500 to 599', function allTests() {
      for (let status = 200; status <= 599; status++) {
        if (status === 400) status = 500;

        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).toHave4xxStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });

  describe('.not.toHave4xxStatus', () => {
    test('passes when given status code not in range 400 to 499', async () => {
      for (let status = 200; status <= 599; status++) {
        if (status === 400) status = 500;

        const response = await axios.post(
          `${apiUrl}/status`,
          {
            status,
          },
          {},
        );

        expect(response).not.toHave4xxStatus();
      }
    });

    describe('status 400 to 499', function allTests() {
      for (let status = 400; status <= 499; status++) {
        test(`fails when response have status code ${status}`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await axios.post(`${apiUrl}/status`, {
            status,
          });

          try {
            expect(response).not.toHave4xxStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }
        });
      }
    });
  });
});
