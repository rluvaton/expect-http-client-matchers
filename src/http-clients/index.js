const { AxiosHttpClientAdapter } = require('./axios-adapter');
const { hasDefaultAdapterConfigured, getDefaultAdapter } = require('./defaults');

/**
 *
 * @type {(typeof HttpClientAdapter)[]}
 */
const adapters = [AxiosHttpClientAdapter];

/**
 *
 * @param response
 * @return {HttpClientAdapter}
 */
function getMatchingAdapter(response) {
  if (hasDefaultAdapterConfigured()) {
    const DefaultAdapter = getDefaultAdapter();

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
};
