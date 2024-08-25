/**
 *
 * @param {HttpClientAdapter} adapter
 */
function isJSONBody(adapter) {
  const headers = adapter.getHeaders();
  // Headers are case-insensitive
  const contentTypeHeaderValue = Object.entries(headers).find(([name]) => name.toLowerCase() === 'content-type')?.[1];

  if (!contentTypeHeaderValue) {
    return false;
  }

  const contentType = contentTypeHeaderValue.toLowerCase();

  return ['application/json', 'application/problem+json'].some((jsonContentType) =>
    contentType.includes(jsonContentType),
  );
}

/**
 *
 * @param {HttpClientAdapter} adapter
 */
function getJSONBody(adapter) {
  const body = adapter.getBody();

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  if (Buffer.isBuffer(body)) {
    try {
      return JSON.parse(body.toString());
    } catch {
      return null;
    }
  }

  return typeof body === 'object' ? body : null;
}

module.exports = { isJSONBody, getJSONBody };
