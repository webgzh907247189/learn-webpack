import {isArray} from 'lodash-es';

function a(){
    console.log('函数a')
}
function b(args){
    var result = isArray(args)
    console.log('函数b')
}

export {a,b}


/**
 * tree-shaking 只有在 prod 情况下才生效
 * 
 * 函数 b 的这种情况，虽然 函数 b 被 tree-shaking 了, 但是lodash打包进来了 (使用 webpack-deep-scope-plugin 解决引入lodash的问题)
 * 
 * 
 * 或者 import {isArray} from 'lodash-es';  
 * function b(args){ let result = isArray(args)} 
 * 这样可以不需要 webpack-deep-scope-plugin, 可以正常被 tree-shaking
 * 
 * 或者 import isArray from 'lodash/isArray', 这样可以减少lodash被引入体积
 */