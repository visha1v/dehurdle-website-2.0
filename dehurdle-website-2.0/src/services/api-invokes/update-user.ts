import { API } from 'constant';
import { APIService } from 'services';

export class UpdateUser {
  async invoke(payload: any): Promise<any> {
    const url = `${API.baseUrl}${API.endPoints.USER}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.patch(url, payload);
  }
}
