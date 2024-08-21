/**
 *
 * @param headers
 * @return {{mapping: Record<string, string>, lowerCaseHeaders: Record<string, string>}}
 */
function getHeadersParsed(headers) {
  return Object.entries(headers).reduce(
    (parsed, [name, value]) => {
      parsed.lowerCaseHeaders[name.toLowerCase()] = value;
      parsed.mapping[name.toLowerCase()] = name;

      return parsed;
    },
    {
      lowerCaseHeaders: {},
      mapping: {},
    },
  );
}

module.exports = {
  getHeadersParsed,
};
