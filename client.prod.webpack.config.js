const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./client.common.webpack.config");
const {merge} = require("webpack-merge");

console.log(MiniCssExtractPlugin);

module.exports = env => merge(common(env, MiniCssExtractPlugin.default.loader), {
    mode: "production",
    output: {
        filename: 'bundle.[fullhash].js',  // use [fullhash] to avoid changes not showing because of browser caching
    },
    plugins: [
        new MiniCssExtractPlugin.default({filename: "[name].[fullhash].css"})
    ]
});