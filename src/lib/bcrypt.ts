import * as crypto from 'crypto';
import * as config from 'config';
import { CryptoConfig } from "../common/interfaces/config.interface"

const cryptoConfig = config.get('crypto') as CryptoConfig;

export default class Bcrypt {
  /**
   * originData
   * @param originData
   * @param algorithm
   * @param key
   * @param iv
   */
  static decrypt({
    originData,
    algorithm = cryptoConfig.algorithm,
    key = cryptoConfig.key,
    iv = cryptoConfig.iv,
  }: {
    originData: string;
    algorithm?: string;
    key?: string;
    iv?: string;
  }) {
    try {
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
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
   * originData
   * @param originData
   * @param algorithm
   * @param key
   * @param iv
   */
  static encrypt({
    originData,
    algorithm = cryptoConfig.algorithm,
    key = cryptoConfig.key,
    iv = cryptoConfig.iv,
  }: {
    originData: string;
    algorithm?: string;
    key?: string;
    iv?: string;
  }) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
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
