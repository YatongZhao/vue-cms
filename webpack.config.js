const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.join(__dirname, "./src/main.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html"
        })
    ],
    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            {test: /\.scss|sass$/, use: ["style-loader", "css-loader", "sass-loader"]},
            {test: /\.jpg|png|gif|bmp$/, use: "url-loader?limit=1024"},
            {test: /\.js$/, use: "babel-loader", exclude: /node_modules/},
            {test: /\.vue$/, use: "vue-loader"},
            {test: /\.ttf|woff|woff2|eot|svg$/, use: "url-loader"}
        ]
    }
    // resolve: {
    //     alias: { // 别名
    //         "vue$": "vue/dist/vue.js"
    //     }
    // }
}