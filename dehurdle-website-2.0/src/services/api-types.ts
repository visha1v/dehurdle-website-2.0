export interface ISubmitSubscriptionEmailPayload {
  email: string;
}

export interface IAuthenticateUserPayload {
  email: string;
  platform: string;
  profession: string;
}

export interface ISubmitAuthenticationOtpPayload {
  email_otp: string;
  user_id: number | null;
}

export interface ISubmitLeadsPayload {
  company_name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  preference: string;
}

export interface WreckerAnswerType {
  optionScore: number;
  questionId: number;
  weightagePercentage: number;
  wreckerId: number;
}
