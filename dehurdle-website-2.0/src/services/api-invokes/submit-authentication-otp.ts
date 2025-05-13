import { API } from 'constant';
import { APIService, ISubmitAuthenticationOtpPayload } from 'services';

export class SubmitAuthenticationOtp {
  async invoke(payload: ISubmitAuthenticationOtpPayload): Promise<any> {
    const url = `${API.baseUrl}${API.endPoints.SUBMIT_AUTHENTICATION_OTP}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.post(url, payload);
  }
}
