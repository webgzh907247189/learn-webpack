import lodash from 'lodash-es';

function a(){
    console.log('函数a')
}
function b(args){
    var result = lodash.isArray(args)
    console.log('函数b')
}

export {a,b}


/**
 * tree-shaking 只有在 prod 情况下才生效
 * 
 * 函数 b 的这种情况，虽然 函数 b 被 tree-shaking 了, 但是lodash打包进来了 (使用 webpack-deep-scope-plugin 解决引入lodash的问题)
 */