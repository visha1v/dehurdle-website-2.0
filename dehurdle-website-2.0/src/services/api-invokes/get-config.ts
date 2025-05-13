import { API } from 'constant';
import { APIService } from 'services';

export class GetConfig {
  async invoke(): Promise<any> {
    const url = `${API.baseUrl}${API.endPoints.CONFIG}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.get(url);
  }
}
