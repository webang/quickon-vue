import axios from 'axios';
import qs from 'qs';
import store from 'store';

/**
 * 追加参数到url
 */
export function buildQuery(url, name, value) {
  if (url.indexOf('?') === -1) {
    url += '?';
  } else {
    url += '&';
  }
  url += name + '=' + value;
  return url;
}

/**
 * 追加多个参数到url
 */
export function buildQuerys(url, obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      url = buildQuery(url, key, obj[key]);
    }
  }
  return url;
}

const apiBase = 'http://localhost:7001';

const instance = axios.create({
  baseURL: apiBase
});

instance.interceptors.request.use((config, promise) => {
  const token = store.get('fk_token');
  if (token) {
    config.url = buildQuery(config.url, 'token', token);
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => error
);

export default instance;
