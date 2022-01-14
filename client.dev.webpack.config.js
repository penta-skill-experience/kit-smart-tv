const common = require("./client.common.webpack.config");
const {merge} = require("webpack-merge");

module.exports = env => merge(common(env), {
    mode: "development",
    output: {
        filename: 'bundle.js',  // we don't need a hash during development
    },
});