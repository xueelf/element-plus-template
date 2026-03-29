import axios, { type AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { isString } from 'radash';
import { useAppStore } from '@/stores/app';
import { router, PATH_SERVER_ERROR, PATH_NETWORK_ERROR } from '@/router';

const baseURL = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_PATH;

export const request = axios.create({
  baseURL,
});

request.interceptors.request.use(
  (config) => {
    const appStore = useAppStore();

    if (isString(appStore.token)) {
      config.headers.setAuthorization(appStore.token);
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    const { config, data: result } = response;

    if (config.responseType === 'blob') {
      return response;
    } else if (config.responseType === 'stream') {
      return response.data;
    }
    config.showFailMessage ??= true;
    config.showSuccessMessage ??= false;

    const { code, data, message = '发生未知错误' } = result as Result;

    if (code === 401) {
      useAppStore().logout();
    }

    if (code !== 200) {
      const error = new Error(message);

      if (config.showFailMessage || code === 401) {
        ElMessage.error(message);
      }
      return Promise.reject(error);
    } else if (code === 200 && config.showSuccessMessage) {
      ElMessage.success(message);
    }
    return data;
  },
  (error: AxiosError) => {
    const { message, response } = error;

    if (message === 'Network Error') {
      ElMessage.error('网络异常，请稍后再试');
      router.push(PATH_NETWORK_ERROR);
    } else if (response?.status === 500) {
      ElMessage.error('服务器错误，请稍后再试');
      router.push(PATH_SERVER_ERROR);
    }
    console.error(message);

    return Promise.reject(error);
  },
);

export default request;
