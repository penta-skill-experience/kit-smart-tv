const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

    mode: "production",

    target: "node",  // this is needed for modules such as "http"

    entry: path.join(__dirname, "src", "server", "api", "app.ts"),

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.ts']
    },

    // need this part for omitting .LICENSE.txt files in the output
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ]
    },

    output: {
        clean: true,
        path: path.join(__dirname, "dist", "server"),
        filename: "server.js"
    }
}