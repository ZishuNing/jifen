import qs from 'qs'
import request from './request'

// 精品推荐
export const JingpinApi = () => request.get("/products/recommend")

// 热门兑换
export const HotApi = () => request.get("/products/hot")

// 发送注册短信验证码( npm i qs 或 yarn add qs )
export const GetCodeApi = (params) => request.post("/sendSMS", qs.stringify(params))

// 手机号验证码登录(含注册)
export const LoginApi = (params) => request.post("/phoneRegin", qs.stringify(params))


// 获取用户信息
export const UserInfoApi = () => request.get("/shop/userProfiles")

// 微信扫码登录
export const WeixinLoginApi = (params) => request.post(`/wechatUsers/PCLogin`, qs.stringify(params));

// 手机绑定微信
export const BindWechatApi = (params) => request.post("/wechatUsers/binding", qs.stringify(params))

// 解绑微信(登录状态下)
export const UnBindWechatApi = () => request.put("/wechatUsers/unbindingWeChat")