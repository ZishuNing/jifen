// 封装axios
import axios from 'axios'

// 创建一个单例
const instance = axios.create({
    baseURL: "http://kumanxuan1.f3322.net:8881/cms",
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config=>{
    return config;
}, err=>{
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res=>{
    return res.data;
}, err=>{
    return Promise.reject(err)
})

export default instance