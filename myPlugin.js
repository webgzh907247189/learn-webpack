const pluginName = 'htmlAfterWebpackPlugin';

// 插件一定要有apply
// 插件要 compile
class htmlBeforeWebpackPlugin {
    apply(compiler) {
        // 注册插件
        compiler.hooks.compilation.tap(pluginName, compilation => {
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