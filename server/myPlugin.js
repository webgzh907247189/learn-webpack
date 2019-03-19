const pluginName = 'htmlAfterWebpackPlugin';

class htmlBeforeWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName,htmlPluginData => {
                const jsList = htmlPluginData.assets.js;
                let _html = htmlPluginData.html
                
                let resultJsStr = jsList.reduce((result,item)=>{
                    result += `<script src='${item}'></script> \n`
                    return result
                },'')

                let cssList = htmlPluginData.assets.css
                let resultCssStr = cssList.reduce((result,item)=>{
                    result += `<link href="${item}" rel="stylesheet"> \n`
                    return result
                },'')

                _html = _html.replace('<!--rejectjs-->',resultJsStr)
                _html = _html.replace('<!--rejectcss-->',resultCssStr)

                htmlPluginData.html = _html
            })
        });
    }
}
module.exports = htmlBeforeWebpackPlugin