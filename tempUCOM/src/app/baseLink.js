import axios from 'axios'

const backendFunc= () => {
 const  __API__ = "http://13.232.174.92/server"
  return axios.create({baseURL: __API__})
}

const backend=backendFunc()
export default backend