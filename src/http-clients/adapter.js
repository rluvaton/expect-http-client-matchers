// When you update here, please also update the index.d.ts in types folder

/**
 *
 * HTTP Client Adapter
 * @abstract
 * @template HttpClientResponse
 */
class HttpClientAdapter {
  /**
   * The name of the client the adapter
   *
   * @type {string}
   * @example axios
   * @abstract
   */
  static name;

  /**
   * The response object
   * @type {HttpClientResponse}
   */
  response;

  /**
   *
   * @param {HttpClientResponse} response
   * @protected
   */
  constructor(response) {
    this.response = response;
  }

  /**
   * Test whether this response can be handled by this adapter
   *
   * @param {unknown} response
   * @returns {'yes' | 'no' | 'maybe'}
   * @abstract
   */
  static canHandle(response) {
    throw new Error('Not implemented');
  }

  /**
   * Get the url of the request, **this may be called multiple times**
   *
   * @returns {string}
   * @abstract
   */
  getUrl() {
    throw new Error('Not implemented');
  }

  /**
   * Get the status code of the response, **this may be called multiple times**
   *
   * @returns {number}
   * @abstract
   *
   */
  getStatusCode() {
    throw new Error('Not implemented');
  }

  /**
   * Get the headers of the response, **this may be called multiple times**
   * @return {Record<string, string>}
   * @abstract
   */
  getHeaders() {
    throw new Error('Not implemented');
  }

  /**
   * Get the body of the response, **this may be called multiple times**
   *
   * @returns {unknown}
   * @abstract
   */
  getBody() {
    throw new Error('Not implemented');
  }
}

module.exports = {HttpClientAdapter};
