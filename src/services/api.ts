import store from "@/redux/store";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";



export const API_BASE_URL = "http://localhost:8080/api";
const DOMAIN = `${API_BASE_URL}`;
const api = axios.create({
  proxy: false,
  baseURL: DOMAIN,
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);
    if (error === null) throw new Error("Unrecoverable error!! Error is null!");
    if (axios.isAxiosError(error)) {
      //here we have a type guard check, error inside this if will be treated as AxiosError
      const response = error?.response;
      const request = error?.request;
      const config = error?.config; //here we have access the config used to make the api call (we can make a retry using this conf)

      if (error.code === "ERR_NETWORK") {
        console.log("connection problems..");
      } else if (error.code === "ERR_CANCELED") {
        console.log("connection canceled..");
      }
      if (response) {
        return Promise.reject(response.data);
      } else if (request) {
        //The request was made but no response was received, error.request is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
      }
    }
    //Something happened in setting up the request and triggered an Error
  }
);
// Add a request interceptor
api.interceptors.request.use(
    (config) => {
      // Get the token from Redux state
      const state = store.getState();
      const token = state.auth.token;

      // If the token exists, set the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // config.headers["User-Agent"] = navigator.userAgent
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default {
  async get<T>(endpoint: string, option?: AxiosRequestConfig): Promise<T> {
    return await api.get(endpoint, option);
  },
  async post<T>(endpoint: string, data?: any, option?: AxiosRequestConfig): Promise<T> {
    return await api.post(endpoint, data, option);
  },
  async put<T>(endpoint: string, data?: any, option?: AxiosRequestConfig): Promise<T> {
    return await api.put(endpoint, data, option);
  },
  async delete<T>(endpoint: string, option?: AxiosRequestConfig): Promise<T> {
    return await api.delete(endpoint, option);
  },
  setDefaultHeader(key: string, data?: string) {
    api.defaults.headers.common[key] = data;
    console.log(`Set header: ${key} = ${data}`);
  },
};
