import axios from "axios";
import storage from "./storage";
import { message } from "antd";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    if (status !== 200) {
      message.error(data.error.message || "Service Error.");
    }
    return Promise.reject(error);
  },
);

export const request = (config) => {
  return new Promise((resolve, reject) => {
    service
      .request(config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
