import axios from 'axios';

const server = 'http://localhost:8080/';

const API = {
    get: path => axios.get(`${server}${path}`).then(response => response),
    post: (path, body) => axios.post(`${server}${path}`, body).then(res => res),
    put: (path, body) => axios.put(`${server}${path}`, body).then(console.log(body)),
    delete: path => axios.delete(`${server}${path}`).then(response => response)
}

export default API;