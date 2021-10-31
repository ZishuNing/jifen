// 封装axios
import axios from 'axios'

// 创建一个单例
const instance = axios.create({
    // baseURL: "/api",
    baseURL: "http://kumanxuan1.f3322.net:8881/cms",
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config=>{
    let token = localStorage.getItem("x-auth-token");
    if(token){
        // 如果有token，这个请求就带上token
        config.headers["x-auth-token"] = token;
    }
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