import axios from 'axios';

const baseUrl = 'https://localhost:7218/Auth'
//'https://private-052d6-testapi4528.apiary-mock.com';

console.log(`api:${baseUrl}`);
const API = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

const request = {
  get: (url: string) => API.get(url, { headers: { authorization: `Bearer ${sessionStorage.getItem('token')}` } }),
  post: (url: string, data?) => API.post(url, data, { headers: { authorization: `Bearer ${sessionStorage.getItem('token')}` } })
};

export default request;
