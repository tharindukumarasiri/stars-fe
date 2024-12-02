import axios from "axios";
import { message } from 'antd';

import config from './config.json'

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    const sessionExpired = error.response.status === 302

    if (error.config?.url?.includes(config.UPDATE_DRAWING_ITEM)) {
        // message.error('Failed to save drawing');
    } else if (!expectedError) {
        console.log("Http error: ", error);
        message.error('An unexpected network error occurred.');
    }

    if (sessionExpired) {
        window.location.replace('/');
    }

    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
    config.headers.common['tenant-id'] = 'Star_DT_001';
    config.headers.common['tenant-db'] = 'Star_DT_001';
    return config;
}, (error) => {
    return Promise.reject(error);
});

//axios.defaults.headers.common['tenant-id'] = localStorage.getItem('database_name');

export default {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete
}