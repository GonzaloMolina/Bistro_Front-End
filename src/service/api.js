import axios from 'axios';

const server = 'http://localhost:8080/';

const header = {
    auth: {
        username: 'admin@mail.com',
        password: 'public123',
    },

    headers: {
        'Content-Type': 'application/json',
    }
}


const API = {
    get: path => axios.get(`${server}${path}`, header).then(response => response),
    getAuth: (path, header) => axios.get(`${server}${path}`, header).then(res => res),
    logIn: (path, body, header) => axios.post(`${server}${path}`, body, header).then(response => response),
    post: (path, body, head) => axios.post(`${server}${path}`, body, head).then(res => res),
    postAdmin: (path, body) => axios.post(`${server}${path}`, body, header).then(res => res),
    put: (path, body) => axios.put(`${server}${path}`, body, header).then(console.log(body)),
    delete: (path, body) => axios.delete(`${server}${path}`, body, header).then(response => response),
    deleteAuth: (path, header) => axios.delete(`${server}${path}`, header).then(response => response)
}

export default API;