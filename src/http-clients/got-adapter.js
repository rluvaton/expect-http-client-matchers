const { HttpClientAdapter } = require('./adapter');

/**
 * @typedef {import('got').Response} GotResponse
 */

/**
 * @extends {HttpClientAdapter<GotResponse>}
 */
class GotHttpClientAdapter extends HttpClientAdapter {
  name = 'got';

  /**
   * @param {GotResponse} response
   */
  constructor(response) {
    super(response);
  }

  getUrl() {
    return this.response.url;
  }

  /**
   *
   * @param response
   * @return {CanAdapterHandle}
   */
  static canHandle(response) {
    if (response.timings) {
      return 'maybe';
    }

    return 'no';
  }

  getStatusCode() {
    return this.response.statusCode;
  }

  getHeaders() {
    return this.response.headers;
  }

  getBody() {
    return this.response.rawBody;
  }
}
module.exports = { GotHttpClientAdapter };
