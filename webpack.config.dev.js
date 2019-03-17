const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');
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
                        loader: 'css-loader'
                    }
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].css",
            chunkFilename: "style/[id].css"
        }),

        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, './dist/*.html')),
        // }),
    ]
}