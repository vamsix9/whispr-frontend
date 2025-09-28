export type SignUpType = 'manual';

export interface ManualSignUpRequestBase {
  signUpType: SignUpType;
  userName: string;
  password: string;
}

export interface ManualSignUpWithEmail extends ManualSignUpRequestBase {
  email: string;
}

export interface ManualSignUpWithMobile extends ManualSignUpRequestBase {
  countryCode: number;
  mobileNumber: number;
}

export type ManualSignUpRequest = ManualSignUpWithEmail | ManualSignUpWithMobile;

export interface ResponseMessage {
  message: string;
}

export interface ErrorResponseSchema {
  statusCode: number;
  error: string;
  message: string;
}

export interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string; // ISO string
}


