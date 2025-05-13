import {
  AuthenticateUser,
  GetConfig,
  GetFaqs,
  GetQuestions,
  ResendOtp,
  SubmitAssessment,
  SubmitAuthenticationOtp,
  SubmitLeads,
  SubmitSubscriptionEmail,
  UpdateUser,
} from './api-invokes';
import {
  IAuthenticateUserPayload,
  ISubmitAuthenticationOtpPayload,
  ISubmitLeadsPayload,
  ISubmitSubscriptionEmailPayload,
} from './api-types';

export class Api {
  static async authenticateUser(payload: IAuthenticateUserPayload): Promise<any> {
    return new AuthenticateUser().invoke(payload);
  }

  static async getConfig(): Promise<any> {
    return new GetConfig().invoke();
  }

  static async getFaqs(): Promise<any> {
    return new GetFaqs().invoke();
  }

  static async getQuestions(): Promise<any> {
    return new GetQuestions().invoke();
  }

  static async resendOtp(payload: any): Promise<any> {
    return new ResendOtp().invoke(payload);
  }

  static async submitAssessment(payload: any): Promise<any> {
    return new SubmitAssessment().invoke(payload);
  }

  static async submitAuthenticationOtp(payload: ISubmitAuthenticationOtpPayload): Promise<any> {
    return new SubmitAuthenticationOtp().invoke(payload);
  }

  static async submitLeads(payload: ISubmitLeadsPayload): Promise<any> {
    return new SubmitLeads().invoke(payload);
  }

  static async submitSubscriptionEmail(payload: ISubmitSubscriptionEmailPayload): Promise<any> {
    return new SubmitSubscriptionEmail().invoke(payload);
  }
  static async updateUser(payload: any): Promise<any> {
    return new UpdateUser().invoke(payload);
  }
}
