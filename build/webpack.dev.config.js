const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    devServer: {
        port: 8082,
    proxy:{
        '/visit/*':{
            // target: 'http://192.168.1.218:8081',  //测试地址
            target: 'http://192.168.3.29:8088',  //测试地址
            changeOrigin: true,
            secure: false
        },
        '/bjmt/*':{
            // target: 'http://192.168.1.218:8081',//测试地址
            target: 'http://192.168.3.29:8088',//测试地址
            changeOrigin: true,
            secure: false
        },
        '/sms/*':{
            // target: 'http://192.168.1.218:8081',//测试地址
            target: 'http://192.168.3.29:8088',//测试地址
            changeOrigin: true,
            secure: false
        }
    }
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'myAiDoctor v' + package.version,
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
        ], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ]
});