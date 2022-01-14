const common = require("./client.common.webpack.config");
const {merge} = require("webpack-merge");

module.exports = env => merge(common(env), {
    mode: "production",
    output: {
        filename: 'bundle.[fullhash].js',  // use [fullhash] to avoid changes not showing because of browser caching
    },
});