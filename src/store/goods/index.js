export default {
    namespaced: true,
    state: {
        // 全部商品页数据
        goodsObj: {
            // 1->精品推荐 2-> 热门兑换 0->全部
            did: 0,
            // ( 1->实体商品 2->虚拟商品 0->全部 )
            type: 0,
            min: 0,
            max: 10000,
            keyword: ""
        }
    },
    mutations: {
        // 方案一：直接整个goodsObj都修改掉
        changeGoodsObj(state, payload){
            state.goodsObj = payload;
        }
    }
}