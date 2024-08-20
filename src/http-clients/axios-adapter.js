/**
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */

/**
 *
 * @type {UnknownHttpClientAdapter}
 */
class AxiosHttpClientAdapter {
  /**
   * @type {AxiosResponse}
   */
  response;

  httpClientName = 'axios';

  constructor(response) {
    this.response = response;
  }

  /**
   *
   * @param response
   * @return {CanAdapterHandle}
   */
  static canHandle(response) {
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
