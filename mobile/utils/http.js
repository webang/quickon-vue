import sha1 from 'sha1';
import axios from 'axios';
import qs from 'qs';
import parse from 'url-parse';
import store from 'store';
import { buildQuery } from './index';

const conf = {
  pid: '1004',
  platform: '5',
  version: 1
};
const apiBase = 'https://api.huishoubao.com';
const appSecret = 'b7cab12b2b81385dd2cccb8ce67e4998';

const createApiSign = (query, body) => {
  const data = Object.assign({}, query, body);
  const kv = [];
  for (const key in data) {
    // if (data[key])
    kv.push(key + data[key]);
  }
  let signStr = kv.sort().join('');
  signStr = `${signStr}${appSecret}`;
  return sha1(signStr).toLowerCase();
};

const instance = axios.create({
  baseURL: apiBase
});

instance.interceptors.request.use((config, promise) => {
  const token = store.get('token');
  if (token) {
    config.url = buildQuery(config.url, 'token', token);
  }
  // build common query
  config.url = buildQuery(config.url, 'version', conf.version);
  config.url = buildQuery(config.url, 'pid', conf.pid);
  config.url = buildQuery(config.url, 'platform', conf.platform);
  config.url = buildQuery(config.url, 'timestamp', Date.parse(new Date()));

  const urlObj = parse(config.url, true);
  const sign = createApiSign(urlObj.query, config.data);
  config.url = buildQuery(config.url, 'sign', sign);

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
