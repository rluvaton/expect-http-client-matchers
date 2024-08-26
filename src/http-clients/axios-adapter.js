const { HttpClientAdapter } = require('./adapter');

/**
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */

class AxiosHttpClientAdapter extends HttpClientAdapter {

  static name = 'axios';

  /**
   * @param {AxiosResponse} response
   */
  constructor(response) {
    super(response);
  }

  /**
   *
   * @param response
   * @return {CanAdapterHandle}
   */
  static canHandle(response) {
    if (response.config) {
      return 'maybe';
    }

    return 'no';
  }

  getUrl() {
    return this.response.config.url;
  }

  getStatusCode() {
    return this.response.status;
  }

  getHeaders() {
    return this.response.headers;
  }

  getBody() {
    return this.response.data;
  }
}
module.exports = { AxiosHttpClientAdapter };
