import axios from 'axios'
import Vue from 'vue'
import Toast from '@/utils/toast'

// cookie
axios.defaults.withCredentials = true;

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    async response => {
        console.log(response.config.url, response);
        const res = response.data

        if (res.code !== 0) {
            Toast.close(); // 最多显示一个错误信息
            Toast.error(res.msg);

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        Toast.close(); // 最多显示一个错误信息
        Toast.error(error.message);
        return Promise.reject(error)
    }
)

Vue.prototype.$axios = service;

export default service
