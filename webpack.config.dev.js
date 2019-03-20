const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");
const setTitle = require('node-bash-title');
setTitle('webpack  Server');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

// const setIterm2Badge = require('set-iterm2-badge');
// setIterm2Badge('prod环境');

const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'

module.exports = {
    entry:{
        index: './src/index.js'
    },
    output:{
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    // 'style-loader',  //  与MiniCssExtractPlugin.loader 冲突
                    {
                        loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    }
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new WebpackDeepScopeAnalysisPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].[hash:5].css",
            chunkFilename: "style/[id].[hash:5].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new DashboardPlugin(),
        new WebpackBuildNotifierPlugin({
            title: "Webpack Build",
            suppressSuccess: true
        })
    ],
    devServer: {
        port: 9000,
        hot: true,
        before(app){
            app.get('/test',(req,res)=>{
                res.json({name: 'test'})
            })
        }
    }
}