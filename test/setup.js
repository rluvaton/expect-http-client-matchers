
const {snapshot, before, after} = require('node:test');
const ansiSerializer = require('./helpers/ansi-snapshot-serializer/serializer');
const axios = require('axios');
const {closeServer} = require('./helpers/server-helper');

// Don't throw on error
axios.defaults.validateStatus = () => true;


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Delete the following headers as they are dynamic and the test snapshot won't match
    delete response.headers['keep-alive'];
    delete response.headers['date'];

    return response;
});

snapshot.setDefaultSnapshotSerializers([
    function getErrorMessage(input) {
        return input instanceof Error ? input.message : input;
    },
    function ansiSnapshotSerializer(input) {
        if (!ansiSerializer.test(input)) {
            return input;
        }

        return ansiSerializer.serialize(input);
    },

    function defaultSnapshotSerializers(input) {
        if (typeof input === 'string') {
            return input;
        }
        return JSON.stringify(input, null, 2);
    },
]);

before(async () => {
    const {default: got} = await import('got')

    // Avoid throwing on error
    got.extend({
        // Don't throw on error
        throwHttpErrors: false,
    });
})

after(async () => {
    await closeServer();
});
