const crypto = require('crypto');
const CRYPTO_ALGORITHM = 'aes-256-cbc';
const { ENCRYPT_KEY } = require('./../config/keyConfig');

function encrypt(text) {
  const cipher = crypto.createCipher(CRYPTO_ALGORITHM, ENCRYPT_KEY);
  let encryptText = cipher.update(text, 'utf8', 'hex');
  encryptText += cipher.final('hex');
  return encryptText;
}

// May through an exception if the encrypt_key is different
function decrypt(encryptText) {
  const decipher = crypto.createDecipher(CRYPTO_ALGORITHM, ENCRYPT_KEY);
  let decryptText = decipher.update(encryptText, 'hex', 'utf8');
  decryptText += decipher.final('utf8');
  return decryptText;
}

module.exports = {
  encrypt,
  decrypt
};