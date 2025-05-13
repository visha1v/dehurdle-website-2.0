import { API } from 'constant';
import { APIService, ISubmitSubscriptionEmailPayload } from 'services';

export class SubmitSubscriptionEmail {
  async invoke(payload: ISubmitSubscriptionEmailPayload): Promise<any> {
    const url = `${API.adminBaseUrl}${API.endPoints.SUBMIT_SUBSCRIPTION_EMAIL}`;
    const apiInstance = await APIService.getInstance();
    return apiInstance.post(url, payload);
  }
}
