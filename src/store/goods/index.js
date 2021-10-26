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
        changeGoodsObj(state, payload) {
            let arr = Object.keys(payload);
            // 循环arr，将每一个值放入到旧对象中进行匹配，看看是否有对应的这个属性
            arr.forEach(item => {
                if (state.goodsObj.hasOwnProperty(item)) {
                    // 此时旧对象有新对象包含的属性
                    state.goodsObj[item] = payload[item]
                }
            })
        }
    }
}