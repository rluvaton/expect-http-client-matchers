const {getGot} = require("../override-http-client-defaults");

const gotTestAdapterClient = {
  name: 'got',
  async request(url, config) {
    return (await getGot()).request({
      url,
      json: typeof config?.data === 'object' ? config?.data : undefined,
      body: typeof config?.data !== 'object' ? config?.data : undefined,
      method: config.method.toUpperCase(),
      headers: config.headers,
      searchParams: config.params,
    });
  },
  async get(url, config) {
    return (await getGot()).get(url, {
      json: typeof config?.data === 'object' ? config?.data : undefined,
      body: typeof config?.data !== 'object' ? config?.data : undefined,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  async delete(url, config) {
    return (await getGot()).delete(url, {
      json: typeof config?.data === 'object' ? config?.data : undefined,
      body: typeof config?.data !== 'object' ? config?.data : undefined,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  async head(url, config) {
    return (await getGot()).head(url, {
      json: typeof config?.data === 'object' ? config?.data : undefined,
      body: typeof config?.data !== 'object' ? config?.data : undefined,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  async options(url, config) {
    return (await getGot()).options(url, {
      json: typeof config?.data === 'object' ? config?.data : undefined,
      body: typeof config?.data !== 'object' ? config?.data : undefined,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  async post(url, data, config) {
    const response = await (await getGot()).post(url, {
      json: typeof data === 'object' ? data : undefined,
      body: typeof data !== 'object' ? data : undefined,
      headers: config?.headers,
      searchParams: config?.params,
    });
    return response;
  },
  async put(url, data, config) {
    return (await getGot()).put(url, {
      json: typeof data === 'object' ? data : undefined,
      body: typeof data !== 'object' ? data : undefined,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  async patch(url, data, config) {
    return (await getGot()).patch(url, {
      json: typeof data === 'object' ? data : undefined,
      body: typeof data !== 'object' ? data : undefined,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
};

module.exports = { gotTestAdapterClient };
