import axios from "axios";
import storage from "./storage";
import { message } from "antd";

class Request {
  constructor(config) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (config) => {
        const token = storage.getToken();
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
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
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(url, config) {
    return this.request({ ...config, method: "get", url });
  }

  post(url, data, config) {
    return this.request({ ...config, method: "post", url, data });
  }

  put(url, data, config) {
    return this.request({ ...config, method: "put", url, data });
  }
  delete(url, config) {
    return this.request({ ...config, method: "delete", url });
  }
}

const request = new Request({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});

export default request;
