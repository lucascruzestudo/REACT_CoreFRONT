
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = new AxiosHeaders({
          ...config.headers,
          Authorization: `Bearer ${token}`,
        });
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        const unauthorizedMessage = t('errors.unauthorized'); 
        console.error(unauthorizedMessage);
      }
      if (error.response?.status === 500) {
        const serverErrorMessage = t('errors.serverError');
        console.error(serverErrorMessage);
      }
      return Promise.reject(error);
    }
  );

const httpService = {
  get: <T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get(url, config);
  },

  post: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post(url, data, config);
  },

  put: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.put(url, data, config);
  },

  delete: <T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete(url, config);
  },
};

export default httpService;
