import axios from "axios";
import { message } from 'antd';

import config from './config.json'

let apiFailedCount = 0;

axios.interceptors.response.use(success => {
    apiFailedCount = 0;
}, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    const sessionExpired = error.response.status === 302
    apiFailedCount++;

    if (error.config?.url?.includes(config.UPDATE_DRAWING_ITEM)) {
        message.error('Failed to save drawing');
    } else if (!expectedError) {
        console.log("Http error: ", error);
        message.error('An unexpected network error occurred.');
    }

    if (sessionExpired || apiFailedCount > 3) {
        window.location.replace('/');
        alert('Session timed out. Please login again.');
    }

    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
    config.headers.common['tenant-id'] = localStorage.getItem('tenant-id');
    config.headers.common['tenant-db'] = localStorage.getItem('tenant-db');
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