const {fixHttpClients, getGot} = require("./helpers/override-http-client-defaults");

const {snapshot, before, after} = require('node:test');
const ansiSerializer = require('./helpers/ansi-snapshot-serializer/serializer');
const {closeServer} = require('./helpers/server-helper');

fixHttpClients();

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
    await getGot();
});

after(async () => {
    await closeServer();
});
