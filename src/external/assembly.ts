import { Request } from './request';
import { Constant } from '../lib';

export class Assembly extends Request {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    super();
    this.name = 'assembly';
    this.baseUrl = Constant.ASSEMBLY.HOST;
    this.apiKey = Constant.ASSEMBLY.API_KEY;
  }

  async getRealTimeToken() {
    const data = {
      url: this.baseUrl + '/v2/realtime/token',
      options: {
        headers: { authorization: this.apiKey },
      },
      body: {
        expires_in: Constant.ASSEMBLY.TOKEN_EXPIRE,
      },
    };
    return await this.post(data);
  }
}
