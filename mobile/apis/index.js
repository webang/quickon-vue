import axios from 'axios';
const config = {
  apiBase: 'http://10.0.10.112:7001'
};

export default {
  getPageDetails(pageId) {
    return axios(`${config.apiBase}/api/page/${pageId}`);
  }
};
