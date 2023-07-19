import request from "../utils/request-axios";

const login = (data) => request.post('/authenticate', data);
const info = () => request.get('/info');

export const Api = {
    login,
    info
}