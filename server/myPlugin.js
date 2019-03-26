const pluginName = 'htmlAfterWebpackPlugin';
const ora = require('ora');
const spinner = ora('开始').start();

class htmlBeforeWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName,htmlPluginData => {
                let _html = htmlPluginData.html

                const jsList = htmlPluginData.assets.js;
                const cssList = htmlPluginData.assets.css

                _html = _html.replace('<!--rejectjs-->',getlist(jsList,'<script src="{0}"></script> \n'))
                _html = _html.replace('<!--rejectcss-->',getlist(cssList,'<link href="{0}" rel="stylesheet"> \n'))

                htmlPluginData.html = _html
                spinner.succeed('构建成功')
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