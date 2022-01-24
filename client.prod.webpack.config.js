const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./client.common.webpack.config");
const {merge} = require("webpack-merge");

module.exports = env => merge(common(env, MiniCssExtractPlugin.loader), {
    mode: "production",
    output: {
        filename: 'bundle.[fullhash].js',  // use [fullhash] to avoid changes not showing because of browser caching
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[fullhash].css"})
    ]
});