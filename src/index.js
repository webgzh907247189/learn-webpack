console.log('222222222222');

import {a,b} from './util';
a()

/**
 * 分包加载
 */
import(/*webpackChunkName: 'async' */ './components/async/index.js').then((obj)=>{
    console.log(obj.init(),'obj')
})