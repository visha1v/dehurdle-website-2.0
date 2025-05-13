import { API } from 'constant';
import { APIService } from 'services';

export class ResendOtp {
  async invoke(payload: any): Promise<any> {
    const url = `${API.baseUrl}${API.endPoints.RESEND_OTP}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.post(url, payload);
  }
}
