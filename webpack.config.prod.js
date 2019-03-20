/**
 * https://juejin.im/post/5b07d02a6fb9a07aa213c9bc
 * webpack 产线配置
 */
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const os = require('os')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// const setIterm2Badge = require('set-iterm2-badge');
// setIterm2Badge('prod环境');

const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'

module.exports =  smp.wrap({
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minSize: 30000,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
                },
                commons: {
                    test: /[\\/]src[\\/]common[\\/]/,
                    name: 'commons',
                    minSize: 30000,
                    minChunks: 3,
                    chunks: 'initial',
                    priority: -1,
                    reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: [
            new UglifyJsPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: os.cpus().length - 1,//true, // 开启并行压缩，充分利用cpu (多核压缩)
                sourceMap: false,
                extractComments: false, // 移除注释
                uglifyOptions: {
                    compress: {
                        unused: true,
                        warnings: false,
                        drop_debugger: true
                    },
                    output: {
                        comments: false
                    }
                }
              }),
            // 用于优化css文件 (CSS nano 解决单页的css)
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, // 不移除autoprefixer加好的前缀
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            })
        ]
    },
    plugins: [
        // new WebpackDeepScopeAnalysisPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].[hash:5].css",
            chunkFilename: "style/[id].[hash:5].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new InlineManifestWebpackPlugin('runtime')
    ]
})