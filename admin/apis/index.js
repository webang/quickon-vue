import axios from 'axios'

export default {
  updatePage({ pageId, title, widget }) {
    return axios(
      `http://localhost:7001/page?pageId=${pageId}&title=${title}&widget=${widget}`
    )
  }
}
