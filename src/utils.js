function generateRandom(length, capitals, minuscules, numbers) {
  var CAPITALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var MINUSCULES = 'abcdefghijklmnopqrstuvwxyz';
  var NUMBERS = '0123456789';

  var pool = '';
  var product = '';

  if (isNaN(length)) length = 32;
  if (!isBoolean(capitals)) capitals = false;
  if (!isBoolean(minuscules)) minuscules = true;
  if (!isBoolean(numbers)) numbers = true;

  if (capitals) pool += CAPITALS;
  if (minuscules) pool += MINUSCULES;
  if (numbers) pool += NUMBERS;

  while (product.length < length) {
    product += pool.substr(Math.floor(pool.length * Math.random()), 1);
  }

  return product;
}

function isBoolean(value) {
  return value === true || value === false;
}

function replaceStatID(type) {
  if (type === 'certificate') {
    return 'Certificate';
  }

  if (type === 'codec') {
    return 'Codec';
  }

  if (type === 'candidate-pair') {
    return 'Candidate Pair';
  }

  if (type === 'remote-candidate') {
    return 'Remote candidate';
  }

  if (type === 'local-candidate') {
    return 'Local candidate';
  }

  if (type === 'inbound-rtp') {
    return 'Inbound RTP';
  }

  if (type === 'track') {
    return 'Track';
  }

  if (type === 'stream') {
    return 'Stream';
  }

  if (type === 'outbound-rtp') {
    return 'Outbound RTP';
  }

  if (type === 'peer-connection') {
    return 'Peer connection';
  }

  if (type === 'transport') {
    return 'Transport';
  }

  return 'Unknown';
}

export { generateRandom, isBoolean, replaceStatID };
