import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const apiBase = isProd ? 'http://kbapi.airtlab.com' : 'http://localhost:7001';

const instance = axios.create({
  baseURL: apiBase
});

export default {
  getPageDetails(pageId) {
    return instance.get(`/api/page/${pageId}`);
  }
};
