import axios from 'axios'

import { ADDRESS } from '../../constants';

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
  if (Array.isArray(file)) {
    for (let i = 0; i < file.length; i += 1) {
      data.append(`image_${i}`, file[i]);
    }
  } else {
    data.append("image", file)
  }
  Object.keys(body).forEach(key => {
    data.append(key, body[key])
  })

  return axios.request({
    url: ADDRESS.BASE_URL + uri,
    method,
    headers: Object.assign({}, defaultHeaders()),
    data: data,
  })
}

export default upload