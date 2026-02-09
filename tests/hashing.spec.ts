import { derivePasswordKey, hashPassword } from '../lib/hashing';
import { encode } from '../lib/base64';

jest.mock('argon2-browser', () => {
  return {
    async hash({
      salt,
      hashLen,
      pass,
      time,
      parallelism,
      mem
    }: {
      salt: string;
      hashLen: number;
      pass: string;
      time: number;
      parallelism: number;
      mem: number;
    }) {
      const key = new Uint8Array([
        salt.length,
        hashLen,
        pass.length,
        time,
        parallelism,
        Math.round(mem / 1024),
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]);
      return { hash: key, hashHex: '', encoded: '' };
    }
  };
});

jest.mock('@/createKey', () => {
  return {
    async createKey({ sizeInBytes }: { sizeInBytes: number }) {
      return new Uint8Array(sizeInBytes);
    }
  };
});

describe('hashing', () => {
  it('derivePasswordKey creates key from password, using new salt.', async () => {
    const [salt, key] = await derivePasswordKey({ password: 'p8ssw0rd!', sizeInBytes: 24 });

    expect(salt).toEqual('AAAAAAAAAAAAAAAAAAAAAA==');
    expect(key).toBeInstanceOf(Uint8Array);
    expect(key).toEqual(new Uint8Array([24, 24, 9, 2, 1, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  });

  it('derivePasswordKey creates key from password, using given salt.', async () => {
    const [salt, key] = await derivePasswordKey({ password: 'p8ssw0rd!', sizeInBytes: 24, salt: 'givenSalt' });

    expect(salt).toEqual('givenSalt');
    expect(key).toBeInstanceOf(Uint8Array);
    expect(key).toEqual(new Uint8Array([9, 24, 9, 2, 1, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  });

  it('hashPassword creates hash from password, using new salt.', async () => {
    const [salt, hash] = await hashPassword({ password: 'p8ssw0rd!', sizeInBytes: 24 });

    expect(salt).toEqual('AAAAAAAAAAAAAAAAAAAAAA==');
    expect(hash).toEqual(encode(new Uint8Array([24, 24, 9, 2, 1, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])));
  });

  it('hashPassword creates hash from password, using given salt.', async () => {
    const [salt, hash] = await hashPassword({ password: 'p8ssw0rd!', sizeInBytes: 24, salt: 'givenSalt' });

    expect(salt).toEqual('givenSalt');
    expect(hash).toEqual(encode(new Uint8Array([9, 24, 9, 2, 1, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])));
  });
});
