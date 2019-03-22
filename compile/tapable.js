// 1. SyncHook同步串行，不关心监听函数的返回值
// 2. SyncBailHook 同步串行 只要监听函数有一个函数的返回值部位null 跳过
// 3. SyncWaterfallHook  同步串行  上一个监听函数的返回值传给下一个
// 4. SyncLoopHook 同步循环 监听函数返回true 反复的执行
// 5. 下面的都是异步的
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");


//接受一个可选的参数  这个参数是一个字符串数组
let queue = new SyncHook(['name'])

//订阅  标识订阅函数   tap 的第二个参数是回掉函数
queue.tap('1',function(name){
	console.log(name,'1')
})

queue.tap('2',function(name,name2){
	console.log(name,'2',name2)
})

// 执行钩子 相当于插件的 apply 方法
queue.call('webpack tapable 模块学习')


//webpack tapable 模块学习 1
//webpack tapable 模块学习 2 undefined





