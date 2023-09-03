import { Request } from './request';
import { Constant } from '../lib';

export class Openai extends Request {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly needProxy: string;
  private readonly proxy: string;

  constructor() {
    super();
    this.name = 'openai';
    this.baseUrl = Constant.OPENAI.HOST;
    this.apiKey = Constant.OPENAI.API_KEY;
    this.needProxy = Constant.OPENAI.NEED_PROXY;
    this.proxy = Constant.OPENAI.PROXY;
  }

  /**
   * openai chat completions
   * @param initialBody
   */
  async chatCompletions(initialBody) {
    const options = {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    } as any;
    if (this.needProxy) {
      options.proxy = this.proxy;
    }
    const data = {
      url: this.baseUrl + '/v1/chat/completions',
      options,
      body: JSON.stringify(initialBody),
    };
    return await this.post(data);
  }
}
