enum ApiResponse {
  Default = '',
  Failure = 'Failure',
  Success = 'Success',
}

enum ApiStatusCode {
  BadRequest = 400,
  Created = 201,
  Forbidden = 403,
  MethodNotFound = 405,
  NetworkError = 'ERR_NETWORK',
  NoContent = 204,
  NotFound = 404,
  ServerError = 500,
  Success = 200,
  Unauthorized = 401,
}

enum ApiErrors {
  BothOtpMismatch = 'BOTH_OTP_MISMATCH',
  EmailOtpMismatch = 'EMAIL_OTP_MISMATCH',
  EnterName = 'ENTER_NAME',
  EnterValidEmail = 'ENTER_VALID_EMAIL',
  EnterValidName = 'ENTER_VALID_NAME',
  InvalidInput = 'INVALID_INPUT',
  InvalidOtp = 'INVALID_OTP',
  InvalidPhone = 'INVALID_PHONE',
  NotificationUpdateSuccess = 'NOTIFICATION_UPDATE_SUCCESS',
  OtpSent = 'OTP_SENT',
  PhoneOtpMismatch = 'PHONE_OTP_MISMATCH',
  ProfileUpdateSuccess = 'PROFILE_UPDATE_SUCCESS',
  SelectDob = 'SELECT_DOB',
  SelectGender = 'SELECT_GENDER',
}

enum ApiMethod {
  Delete = 'delete',
  Get = 'get',
  Patch = 'patch',
  Post = 'post',
  Put = 'put',
}

enum ApiStatusPreset {
  AppConfig = 'appConfig',
  AuthenticateUser = 'authenticateUser',
  GetFaqs = 'getFaqs',
  GetWreckerQuestions = 'getWreckerQuestions',
  ResendOtp = 'resendOtp',
  SubmitAuthenticationOtp = 'submitAuthenticationOtp',
  SubmitLeads = 'submitLeads',
  SubmitSubscriptionEmail = 'submitSubscriptionEmail',
  SubmitWreckerAssessment = 'submitWreckerAssessment',
  UpdateProfile = 'updateProfile',
}

export const API_TIMEOUT = 5000;

const API = {
  baseUrl: import.meta.env.VITE_API_END_POINT,
  adminBaseUrl: import.meta.env.VITE_ADMIN_API_END_POINT,
  publicCdnUrl: import.meta.env.VITE_APP_AWS_PUBLIC_CDN_URL,
  config: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': '',
    },
  },
  endPoints: {
    ASSESSMENT_LIST: 'assessments',
    ASSESSMENT_QUESTIONS: 'admin/wrecker_assessment_questionnaire',
    AUTHENTICATE_USER: 'auth',
    LEADS: 'admin/leads',
    CONFIG: 'admin/configurations',
    FAQ: 'admin/faq',
    RESEND_OTP: 'resend-otp',
    SUBMIT_AUTHENTICATION_OTP: 'auth/submit',
    SUBMIT_SUBSCRIPTION_EMAIL: 'admin/notifications-subscription',
    USER: 'user',
  },
};

export { API, ApiErrors, ApiMethod, ApiResponse, ApiStatusCode, ApiStatusPreset };
