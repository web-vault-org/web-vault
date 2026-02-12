const getCrypto = function (): Crypto {
  if (!globalThis.crypto?.subtle) {
    throw new Error('crypto.subtle not available. Wrong Environment or unsecure context');
  } else {
    return globalThis.crypto;
  }
};

export { getCrypto };
