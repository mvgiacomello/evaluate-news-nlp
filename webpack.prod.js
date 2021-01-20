const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = [
    {
        mode: "production",
        entry: "./src/client/index.js",
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: '/\.js$/',
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html"
            }),
            new CleanWebpackPlugin(),
            new WorkboxPlugin.GenerateSW()
        ]
    }
]