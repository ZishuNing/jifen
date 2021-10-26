// 新的对象
let payload = {
    name: "张三",
    age: 24
}

// 旧的对象
let goodsObj = {
    name: "李四",
    age: 24
}

// 旧的对象中，如果有新的对象存在的属性，并且值不一样，那么修改就对象的key值

// 先要知道新的对象到底有哪些属性(key)
// console.log();  // [ 'name', 'age' ]
let arr = Object.keys(payload);

// 循环arr，将每一个值放入到旧对象中进行匹配，看看是否有对应的这个属性
arr.forEach(item=>{
    if(goodsObj.hasOwnProperty(item)){
        // 此时旧对象有新对象包含的属性
        goodsObj[item] = payload[item]
    }
})

// console.log('这是个旧对象', goodsObj)

// 验证goodsObj中有name属性
// console.log(goodsObj.hasOwnProperty('xxx'));

