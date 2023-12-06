import { MD5, TripleDES, enc } from 'crypto-js';
import { Authenticate } from '@/common/interfaces/authenticated.interface';

export const EncryptUtils = {
  encrypt: (data: Authenticate.IAuthToken, token: string): string => {
    const key = MD5(token).toString();
    const payload = TripleDES.encrypt(JSON.stringify(data), key).toString();
    return payload;
  },

  decrypt: (
    data: string,
    token: string,
  ): Authenticate.IAuthenticatedUser['user'] => {
    const key = MD5(token).toString();
    const payload = TripleDES.decrypt(data, key).toString(enc.Utf8);
    return JSON.parse(payload);
  },
};
