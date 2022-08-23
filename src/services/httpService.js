import axios from "axios";
import { message } from 'antd';

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        console.log("Http error: ", error);
        message.error('An unexpected network error occurred.');
    }

    return Promise.reject(error);
});

axios.defaults.headers.common['tenant-id'] = localStorage.getItem('database_name');

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}