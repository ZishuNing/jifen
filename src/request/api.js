import axios from 'axios'
import request from './request'

// 精品推荐
export const JingpinApi = () => request.get("/products/recommend")

// 热门兑换
export const HotApi = (params) => request.get("/products/hot")
