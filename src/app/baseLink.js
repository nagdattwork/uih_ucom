import axios from 'axios'

const backendFunc= () => {
 const  __API__ = "http://localhost:5000/"
// const  __API__ = "http://13.232.174.92/server/"

  return axios.create({baseURL: __API__,
  
    maxContentLength: 100 * 1024 * 1024,
    maxBodyLength: 100 * 1024 * 1024,
  })
}

const backend=backendFunc()
export default backend