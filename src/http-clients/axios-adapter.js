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
   * @param _response
   * @return {CanAdapterHandle}
   */
  static canHandle(_response) {
    // TODO - implement
    return 'maybe';
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
