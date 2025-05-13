import { API, ApiStatusCode } from 'constant';
import { APIService } from 'services';

export interface IFaqData {
  answer: string;
  question: string;
  category: string;
}

export interface IGetFaqResponse {
  data: Array<IFaqData>;
  status: ApiStatusCode;
}

export class GetFaqs {
  async invoke(): Promise<IGetFaqResponse> {
    const url = `${API.baseUrl}${API.endPoints.FAQ}?platform=WEB`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.get(url);
  }
}
