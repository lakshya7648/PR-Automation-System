const crypto = require('crypto');

const verifySignature = async (secret, signature, payload) => {
  const payloadString = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', secret);
  const digest = `sha256=${hmac.update(payloadString).digest('hex')}`;
  let isValid;

  try {
    isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch (error) {
    throw new Error(error.message);
  }

  if (!isValid) {
    throw new Error('Invalid Signature');
  }

  return true;
};

module.exports = verifySignature;
