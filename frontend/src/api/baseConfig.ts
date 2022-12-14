import { AxiosRequestConfig } from 'axios';

export const baseConfig: AxiosRequestConfig = {
  headers: {
    'Content-type': 'application/json',
  },
  baseURL: '/bff',
  withCredentials: true,
};
