import { API } from 'constant';
import { APIService } from 'services';

export class SubmitLeads {
  async invoke(payload: any): Promise<any> {
    const submitLeadsEndpoint = `${API.adminBaseUrl}${API.endPoints.LEADS}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.post(submitLeadsEndpoint, payload);
  }
}
