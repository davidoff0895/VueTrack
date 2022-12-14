import { baseConfig } from '@/api/baseConfig';
import { AxiosRequestConfig } from 'axios';

export const getServiceConfig = (moduleName: string): AxiosRequestConfig => ({
  ...baseConfig,
  baseURL: `${baseConfig.baseURL}/${moduleName}`,
});
