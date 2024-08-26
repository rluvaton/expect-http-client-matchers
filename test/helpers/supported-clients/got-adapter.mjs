import got from 'got';

const gotTestAdapterClient = {
  name: 'axios',
  request(url, config) {
    return got.request({
      url,
      body: config.data,
      method: config.method.toUpperCase(),
      headers: config.headers,
      searchParams: config.params,
    });
  },
  get(url, config) {
    return got.get(url, {
      body: config?.data,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  delete(url, config) {
    return got.delete(url, {
      body: config?.data,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  head(url, config) {
    return got.head(url, {
      body: config?.data,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  options(url, config) {
    return got.options(url, {
      body: config?.data,
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  post(url, data, config) {
    return got.post(url, data, {
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  put(url, data, config) {
    return got.put(url, data, {
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
  patch(url, data, config) {
    return got.patch(url, data, {
      headers: config?.headers,
      searchParams: config?.params,
    });
  },
};

export { gotTestAdapterClient };
