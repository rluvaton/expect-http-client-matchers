const axios = require('axios');


/**
 * @type {import('got').Got | undefined}
 */
let got;

async function getGot() {
    if (!got) {
        const defaultGot = (await import('got')).default;

        // Avoid throwing on error
        got = defaultGot.extend({
            // Don't throw on error
            throwHttpErrors: false,

            // Don't retry
            retry: {
                limit: 0,
            },

            hooks: {
                afterResponse: [
                    (response) => {
                        // Delete the following headers as they are dynamic and the test snapshot won't match
                        delete response.headers['keep-alive'];
                        delete response.headers['date'];

                        return response;
                    }
                ],
            },

            mutableDefaults: true,
        });
    }

    return got;
}

function fixHttpClients() {

    // Don't throw on error
    axios.defaults.validateStatus = () => true;

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Delete the following headers as they are dynamic and the test snapshot won't match
        delete response.headers['keep-alive'];
        delete response.headers['date'];

        return response;
    });

    getGot().catch((e) => {
        console.error('failed to get got', e);
    });
}


module.exports = {
    getGot,
    fixHttpClients
}
