const { AxiosHttpClientAdapter } = require('./axios-adapter');

/**
 *
 * @type {(typeof HttpClientAdapter)[]}
 */
let adapters = [AxiosHttpClientAdapter];

/**
 *
 * @type {typeof HttpClientAdapter}
 */
let DefaultAdapter;

/**
 *
 * @param {(typeof HttpClientAdapter)[]} customAdapters
 */
function addSupportedAdapters(customAdapters) {
  adapters = [...new Set([...adapters, ...customAdapters]).keys()];
}

/**
 *
 * @param {string} adapterName
 */
function setDefaultAdapterName(adapterName) {
  const adapterFound = adapters.find((adapter) => adapter.name === adapterName);

  if (!adapterFound) {
    throw new Error(`Adapter with name ${adapterName} not found`);
  }

  DefaultAdapter = adapterFound;
}

/**
 *
 * @param response
 * @return {HttpClientAdapter}
 */
function getMatchingAdapter(response) {
  if (DefaultAdapter) {
    return new DefaultAdapter(response);
  }

  const MatchingAdapter = adapters.find((adapter) => adapter.canHandle(response) === 'yes');

  if (MatchingAdapter) {
    return new MatchingAdapter(response);
  }

  const MaybeMatchingAdapters = adapters.filter((adapter) => adapter.canHandle(response) === 'maybe');

  if (MaybeMatchingAdapters.length === 1) {
    return new MaybeMatchingAdapters[0](response);
  }

  if (MaybeMatchingAdapters.length > 1) {
    throw new Error(
      `Multiple adapters can handle the response (${MaybeMatchingAdapters.map((adapter) => adapter.name).join(', ')})`,
    );
  }

  throw new Error('No adapter can handle the response');
}

module.exports = {
  getMatchingAdapter,
  addSupportedAdapters,
  setDefaultAdapterName,
};
