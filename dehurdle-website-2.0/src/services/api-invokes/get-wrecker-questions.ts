import { API } from 'constant';
import { APIService } from 'services';

export class GetQuestions {
  async invoke(): Promise<any> {
    const url = `${API.baseUrl}${API.endPoints.ASSESSMENT_QUESTIONS}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.get(url);
  }
}
