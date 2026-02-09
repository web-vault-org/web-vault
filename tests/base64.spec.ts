import { encode, decode } from '@/base64';

describe('base64', () => {
  it('encode encodes to base64.', async () => {
    const bytes = new Uint8Array([0, 1, 2, 3, 4, 5]);

    const text = encode(bytes);

    expect(text).toEqual('AAECAwQF');
  });

  it('decode decodes to Uint8Array.', async () => {
    const text = 'abcdefgh';

    const bytes = decode(text);

    expect(bytes).toEqual(new Uint8Array([105, 183, 29, 121, 248, 33]));
  });

  it('round trip.', async () => {
    const bytes = new Uint8Array([1, 2, 3]);

    const text = encode(bytes);
    const bytes_again = decode(text);

    expect(bytes).toEqual(bytes_again);
  });
});
