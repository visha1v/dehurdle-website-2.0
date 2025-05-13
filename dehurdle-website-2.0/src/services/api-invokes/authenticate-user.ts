import { API } from 'constant';
import { APIService, IAuthenticateUserPayload } from 'services';

export class AuthenticateUser {
  async invoke(payload: IAuthenticateUserPayload): Promise<any> {
    const url = `${API.baseUrl}${API.endPoints.AUTHENTICATE_USER}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.post(url, payload);
  }
}
