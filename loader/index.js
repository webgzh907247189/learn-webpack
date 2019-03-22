// loader区分顺序  [xx1-loader,xx2-loader]
// 最后的loader先调用
// 中间loader执行的时候，传入的是上个loader的执行结果
// loader有异步  this.async()  this.callback()

module.exports = function(content,map,meta){
    console.log('my loader',this.data)
    let {value:{name=''}={}} = this.data
    return content + name
}


//前置钩子
module.exports.pitch = function(remainRequest,preQuest,data){
    data.value = {
        name: '11111111111111111'
    }
}
// 前置钩子的执行顺序
// xx1loader -> pitch
// xx2loader -> pitch