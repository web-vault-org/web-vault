import crypto from 'node:crypto';

const getCrypto = function (): Crypto {
  return crypto.webcrypto as Crypto;
};

export { getCrypto };
