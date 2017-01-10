'use scrict'

let path = require('path'),
webpack = require('webpack'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
OfflinePlugin = require('offline-plugin');

module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        path.join(__dirname, './public/app/src' , 'main.js')
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress : {
        //         warnings : false,
        //     }
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new OfflinePlugin({
            cacheMaps: [
                {
                    match: function(requestUrl) {
                        return new URL('/', location);
                    },
                    requestTypes: ['navigate']
                }
            ],
            externals: [
                "https://fonts.googleapis.com/css?family=Roboto:500",
                "main.js.map",
                "index.html"
            ]
        })
    ],
    resolve: {
        root: [path.resolve('./public/dist')],
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    "presets": ["react", "es2015", "stage-0"]
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    postss: function() {
        return [autoprefixer, precss];
    }
};
