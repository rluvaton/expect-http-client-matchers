const Fastify = require('fastify');

/**
 * @type {import('fastify').fastify | undefined}
 */
let fastify;

async function buildServer() {
  if (fastify) {
    return;
  }

  fastify = Fastify();

  fastify.post('/status', async (request, reply) => {
    return reply.status(request.body.status).send({});
  });

  await fastify.listen({
    host: '127.0.0.1',

    // Having constant port so the snapshot matches the response
    port: 54607,
  });

  const instance = fastify.server;

  // Don't hold the server for the tests
  instance.unref();
}

async function closeServer() {
  if (!fastify) {
    return;
  }
  await fastify.close();
}

function getServerUrl() {
  return `http://127.0.0.1:54607`;
}

module.exports = { buildServer, getServerUrl, closeServer };
