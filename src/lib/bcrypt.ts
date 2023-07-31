import * as crypto from 'crypto-js';

const secretKey = 'demo';
export default class Bcrypt {
  static encrypt(text: string): string {
    return crypto.AES.encrypt(text, secretKey).toString();
  }

  static decrypt(ciphertext: string): string {
    // console.log(ciphertext);
    // console.log('========');
    const bytes = crypto.AES.decrypt(ciphertext, secretKey);
    const decryptStr = bytes.toString(crypto.enc.Utf8);
    console.log(decryptStr);
    return decryptStr;
  }
}
