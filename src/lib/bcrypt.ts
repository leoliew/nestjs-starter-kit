import * as crypto from 'crypto';
import * as config from 'config';
import { CryptoConfig } from '../common/interfaces/config.interface';

const cryptoConfig = config.get('crypto') as CryptoConfig;

export default class Bcrypt {
  /**
   * decrypt
   * @param originData
   */
  static decrypt(originData: string) {
    try {
      const decipher = crypto.createDecipheriv(
        cryptoConfig.algorithm,
        cryptoConfig.key,
        cryptoConfig.iv,
      );
      let decryptData = decipher.update(originData, 'base64', 'utf8');
      decryptData += decipher.final('utf8');
      return decryptData;
    } catch (error) {
      console.error('decrypt text:', originData);
      console.error('decrypt error', error);
      throw new Error(error);
    }
  }

  /**
   * encrypt
   * @param originData
   */
  static encrypt(originData: string) {
    const cipher = crypto.createCipheriv(
      cryptoConfig.algorithm,
      cryptoConfig.key,
      cryptoConfig.iv,
    );
    let encryptData = cipher.update(originData, 'utf8', 'base64');
    encryptData += cipher.final('base64');
    return encryptData;
  }

  /**
   * check is encrypted
   * @param text
   */
  static isEncrypted(text: string) {
    const regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return regex.test(text);
  }
}
