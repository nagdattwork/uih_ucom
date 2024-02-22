import axios from 'axios'

const backendFunc= () => {
 const  __API__ = "http://localhost:5000/"
  return axios.create({baseURL: __API__})
}

const backend=backendFunc()
export default backend