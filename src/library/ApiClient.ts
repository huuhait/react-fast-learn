import config from "../config";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const jsonToParam = (json: any, first_str = "?") => {
  let parts = [];
  for (var i in json) {
    if (json.hasOwnProperty(i) && json[i]) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(json[i]));
    }
  }
  return parts.length ? first_str + parts.join("&") : "";
};

const formatError = async (error: any) => {
  const { response } = error;
  // const errors: string[] = response.data.errors;

  // for await (const message of errors) {
    
  // }
};

const csrf_headers = () => {
  const csrf_token = localStorage.getItem("csrf_token");
  const headers = { "X-CSRF-Token": csrf_token };

  return csrf_token ? headers : {};
};

const getClient = (baseURL: string) => {
  const client = axios.create({ baseURL, headers: csrf_headers() });
  client.interceptors.response.use(
    response => Promise.resolve(response),
    error => {
      formatError(error);
      return Promise.reject(error);
    }
  );
  return client;
};

class ApiClient {
  private client: AxiosInstance;
  constructor() {
    this.client = getClient(config.api_url);
  }

  async get(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.get(
        url + jsonToParam(data, url.includes("?") ? "&" : "?"),
        conf
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.delete(
        url,
        {
          data: data,
          ...conf
        }
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async head(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.head(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async options(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.options(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.post(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.put(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.patch(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ApiClient;
