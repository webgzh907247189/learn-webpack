const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const myPlugin = require('./myPlugin.js')


module.exports = {
    entry:{
        index: './views/index.js'
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
        new MiniCssExtractPlugin({
            filename: "style/[name].[hash:5].css",
            chunkFilename: "style/[id].[hash:5].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './views/index.html',
            inject: false
        }),
        new myPlugin()
    ],
}