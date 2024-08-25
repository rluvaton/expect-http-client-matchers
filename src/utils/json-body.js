
/**
 *
 * @param {HttpClientAdapter} adapter
 */
function getJSONBody(adapter) {
    const body = adapter.getBody();

    if (typeof body === 'string') {
        try {
            return JSON.parse(body);
        } catch (e) {
            return null;
        }
    }

    if (Buffer.isBuffer(body)) {
        try {
            return JSON.parse(body.toString());
        } catch (e) {
            return null;
        }
    }

    return typeof body === 'object' ? body : null;
}

module.exports = { getJSONBody };
