console.log('222222222222');

import {a,b} from './util';
import {appendChildren,getJSON} from './components/header/header.js';
a()
setTimeout(()=>{
    appendChildren()
},2000)
getJSON()


/**
 * 分包加载
 */
import(/*webpackChunkName: 'async' */ './components/async/index.js').then((obj)=>{
    console.log(obj.init(),'obj')
})