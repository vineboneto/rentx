import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.5.114:3334',
})

export default api
