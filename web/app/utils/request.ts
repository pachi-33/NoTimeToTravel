import axios from 'axios';
import { error } from './message';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost',
  timeout: 1000 * 30,
});

// Alter defaults after instance has been created
instance.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request
    return config;
  },
  async (error) => {
    // Do something with request error
    return await Promise.reject(error);
  }
);

const errorHandle = (status: number, other: string): void => {
  switch (status) {
    case 400:
      error(other);
      break;

    default:
      console.log(status, other);
      error(`${status}: ${other}`);
  }
};

// Add a response interceptor
instance.interceptors.response.use(
  async (response) => {
    // Do something with response data
    if (response.status === 200) {
      return response;
    } else {
      return await Promise.reject(response);
    }
  },
  async (error) => {
    // Do something with response error
    // error code message
    errorHandle(
      error.response.status as number,
      error.response.data.message as string
    );
    return await Promise.reject(error);
  }
);

export default instance;
