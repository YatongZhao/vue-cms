const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const cleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")
const extractTextPlugin = require("extract-text-webpack-plugin")
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
    entry: {
        app: path.join(__dirname, "./src/main.js"),
        vendors: ['jquery']
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "js/index.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new cleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "js/vendors.js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "production"
        }),
        new extractTextPlugin("css/styles.css"),
        new optimizeCSSAssetsPlugin()
    ],
    module: {
        rules: [
            {test: /\.css$/, use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"],
                publicPath: "../"
            })},
            {test: /\.less$/, use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"],
                publicPath: "../"
            })},
            {test: /\.scss|sass$/, use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"],
                publicPath: "../"
            })},
            {test: /\.jpg|png|gif|bmp$/, use: "url-loader?limit=1024&name=images/img-[hash:7].[ext]"},
            {test: /\.js$/, use: "babel-loader", exclude: /node_modules/},
            {test: /\.vue$/, use: "vue-loader"},
            {test: /\.ttf|woff|woff2|eot|svg$/, use: "url-loader"}
        ]
    }
}