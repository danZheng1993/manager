import axios from 'axios'
let baseURL = "http://123.57.81.103:4000/"
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

const upload = (uri, method, file, body={}) => {
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