const zlib = require('zlib');
const { promisify } = require('util');

const deflateAsync = promisify(zlib.deflate);
const inflateAsync = promisify(zlib.inflate);

const zip = async strValue => {
  const zippedString = await deflateAsync(JSON.stringify(strValue));
  return zippedString.toString('base64');
};

const unzip = async strValue => {
  const unzippedValue = await inflateAsync(Buffer.from(strValue, 'base64'));
  return unzippedValue.toString();
};

module.exports = {
  zip,
  unzip
};
