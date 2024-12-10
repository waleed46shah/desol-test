"use client";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://desol-test-be.vercel.app/api/",
});

class APIClient<TRequest, TResponse> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (endpoint: string, id?: string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<TResponse>(`${endpoint}/${id}`, config)
      .then((res) => res.data);
  };

  post = (endpoint: string, data: TRequest, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<TResponse>(endpoint, data, config)
      .then((res) => res.data);
  };

  put = (endpoint: string, data: TRequest, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put<TResponse>(`${endpoint}`, data, config)
      .then((res) => res.data);
  };

  delete = (endpoint: string, id?: string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete<TResponse>(`${endpoint}/${id}`, config)
      .then((res) => res.data);
  };
}
export default APIClient;
