import axios from 'axios'
import request from './request'

// 精品推荐
export const JingpinApi = () => request.get("/products/recommend")

// 登录
// export const LoginApi = (params) => request.post("/auth/loginByWeb", params)
