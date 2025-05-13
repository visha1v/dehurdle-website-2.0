import { API } from 'constant';
import { APIService } from 'services';

export class SubmitAssessment {
  async invoke(payload: any): Promise<any> {
    const submitAssessmentEndpoint = `${API.baseUrl}${API.endPoints.ASSESSMENT_LIST}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.post(submitAssessmentEndpoint, payload);
  }
}
