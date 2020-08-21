import axios from 'axios'
const baseURL = "https://dry-dawn-50400.herokuapp.com/"
// const baseURL = "http://localhost:4000/"
const defaultHeaders = () => {
  var auth = localStorage.getItem('hvr_auth')
  //axios.defaults.baseURL = process.env.API_ROOT + '/'
  var headers = {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  }

  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = 'Bearer ' + token
  }
  return headers
}

const upload = (uri, method, file, body = {}) => {
  const data = new FormData()
  data.append("image", file)
  Object.keys(body).forEach(key => {
    data.append(key, body[key])
  })

  return axios.request({
    url: baseURL + uri,
    method,
    headers: Object.assign({}, defaultHeaders()),
    data: data,
  })
}

export default upload