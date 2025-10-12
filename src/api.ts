// import { ManualSignUpRequest, ResponseMessage, ErrorResponseSchema, HealthResponse } from './types';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// async function handleResponse<T>(res: Response): Promise<T> {
//   const text = await res.text();
//   const data = text ? JSON.parse(text) : undefined;
//   if (!res.ok) {
//     throw (data as ErrorResponseSchema) ?? { statusCode: res.status, error: 'Error', message: res.statusText };
//   }
//   return data as T;
// }

// export async function getHealth(): Promise<HealthResponse> {
//   const res = await fetch(`${BASE_URL}/health`, {
//     method: 'GET',
//     headers: { 'Accept': 'application/json' },
//   });
//   return handleResponse<HealthResponse>(res);
// }

// export async function signUp(payload: ManualSignUpRequest): Promise<ResponseMessage> {
//   const res = await fetch(`${BASE_URL}/signUp`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });
//   return handleResponse<ResponseMessage>(res);
// }



