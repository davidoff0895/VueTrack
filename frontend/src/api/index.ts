import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Api {
  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  private axiosInstance: AxiosInstance;

  async get<T = any>(url: string, params?: any): Promise<T> {
    const { data } = await this.axiosInstance.get(url, { params });
    return data;
  }
  async post<T = any>(url: string, params?: any): Promise<T> {
    const { data } = await this.axiosInstance.post(url, params);
    return data;
  }
}
