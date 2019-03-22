const pluginName = 'htmlAfterWebpackPlugin';
/**
 * webpack 使用 tapable 来协助实现对整个构件流程的控制
 * tapable 定义了主要构建流程后
 * 使用tapable添加了各种各样的钩子方法来将 webpack 扩展至功能十分丰富，这就是plugin的机制
 */

// 插件一定要有apply
// 插件要 compile
class htmlBeforeWebpackPlugin {
    apply(compiler) {
        // 注册插件 使用 hooks
        compiler.hooks.compilation.tap(pluginName, compilation => {  // compilation 构建结果
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName,htmlPluginData => {
                let _html = htmlPluginData.html

                const jsList = htmlPluginData.assets.js;
                const cssList = htmlPluginData.assets.css

                _html = _html.replace('<!--rejectjs-->',getlist(jsList,'<script src="{0}"></script> \n'))
                _html = _html.replace('<!--rejectcss-->',getlist(cssList,'<link href="{0}" rel="stylesheet"> \n'))

                htmlPluginData.html = _html
            })
        });
    }
}
module.exports = htmlBeforeWebpackPlugin

function getlist(arr,str){
    return arr.reduce((result,item)=>{
            result += str.replace('{0}', item)
            return result
    },'')
}