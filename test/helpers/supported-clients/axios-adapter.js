const axios = require('axios');

const axiosTestAdapterClient = {
  name: 'axios',
  request(url, config) {
    return axios.request({
      url,
      data: config.data,
      method: config.method,
      headers: config.headers,
      params: config.params,
    });
  },
  get(url, config) {
    return axios.get(url, {
      data: config?.data,
      headers: config?.headers,
      params: config?.params,
    });
  },
  delete(url, config) {
    return axios.delete(url, {
      data: config?.data,
      headers: config?.headers,
      params: config?.params,
    });
  },
  head(url, config) {
    return axios.head(url, {
      data: config?.data,
      headers: config?.headers,
      params: config?.params,
    });
  },
  options(url, config) {
    return axios.options(url, {
      data: config?.data,
      headers: config?.headers,
      params: config?.params,
    });
  },
  post(url, data, config) {
    return axios.post(url, data, {
      headers: config?.headers,
      params: config?.params,
    });
  },
  put(url, data, config) {
    return axios.put(url, data, {
      headers: config?.headers,
      params: config?.params,
    });
  },
  patch(url, data, config) {
    return axios.patch(url, data, {
      headers: config?.headers,
      params: config?.params,
    });
  },
};

module.exports = {
  axiosTestAdapterClient,
};
