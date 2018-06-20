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

export { generateRandom, isBoolean };
