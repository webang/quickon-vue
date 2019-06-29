import axios from 'axios'

export default {
  getPageDetails(pageId) {
    return axios(`http://localhost:7001/api/page/${pageId}`)
  }
}
