const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const PurifyCSSPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob-all')
const path = require('path');

// const setIterm2Badge = require('set-iterm2-badge');
// setIterm2Badge('prod环境');

const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'

module.exports = {
    entry:{
        index: './src/index.js'
    },
    output:{
        filename: 'scripts/[name].[hash:5].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader: "style-loader",
                        options: {
                            singleton: true
                        }
                    },
                    use: [
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                  })
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // commons: {
                //     chunks: 'initial',
                //     name: 'common',
                //     minChunks: 1,
                //     maxInitialRequests: 5,
                //     minSize: 0
                // }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: [
            // 压缩 css
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // new WebpackDeepScopeAnalysisPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new ExtractTextPlugin({
            filename: "style/[name].[hash:5].css",
            allChunks: false
        }),
        /**
         * CSS nano 解决单页的css
         */
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.resolve(__dirname, "./dist/*.html"),
                path.resolve(__dirname, "./src/*.js")
            ])
        })
    ]
}