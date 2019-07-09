import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const apiBase = isProd ? 'http://kbapi.airtlab.com' : 'http://10.0.10.112:7001';

const instance = axios.create({
  baseURL: apiBase
});

export default {
  getPageDetails(id) {
    return instance.get(`/api/page/${id}`);
  },
  getRichTextDetails(id) {
    return instance.get(`/api/richText/${id}`);
  }
};
