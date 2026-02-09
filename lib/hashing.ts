import { hash } from 'argon2-browser';
import { createKey } from '@/createKey';
import { encode } from '@/base64';

const createNewSalt = async function () {
  const key = await createKey({ sizeInBytes: 16 });
  return encode(key);
};

const derivePasswordKey = async function ({
  password,
  sizeInBytes,
  salt
}: {
  password: string;
  sizeInBytes: number;
  salt?: string;
}): Promise<[string, Uint8Array]> {
  salt = salt || (await createNewSalt());
  const result = await hash({ salt, hashLen: sizeInBytes, pass: password, time: 2, parallelism: 1, mem: 24_576 });
  return [salt, result.hash];
};

const hashPassword = async function ({
  password,
  sizeInBytes,
  salt
}: {
  password: string;
  sizeInBytes: number;
  salt?: string;
}): Promise<[string, string]> {
  const [salt_, hash] = await derivePasswordKey({ password, sizeInBytes, salt });
  return [salt_, encode(hash)];
};

export { derivePasswordKey, hashPassword };
