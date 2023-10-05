import { Constant } from './index';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { AppException } from '../common/exceptions/app.exception';

export default class FileUtils {
  /**
   * write mp3 file
   * @param audio_file
   */
  static async writeMp3File(audio_file: any): Promise<string> {
    const destinationPath = `${Constant.PATH.ROOT_PATH}/uploads`;
    const fileName = `${Date.now()}.mp3`;
    const filePath = `${destinationPath}/${fileName}`;
    Logger.log(`file path: ${destinationPath}/${fileName}`);
    try {
      fs.writeFileSync(`${destinationPath}/${fileName}`, audio_file.buffer);
      return filePath;
    } catch (error) {
      Logger.error(error);
      throw new AppException(
        'Error writing mp3 file',
        Constant.APP_ERROR_CODE.WRITE_BUFFER_ERROR,
      );
    }
  }
}
