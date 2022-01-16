const path = require("path");

module.exports = {

    mode: "production",

    entry: path.join(__dirname, "src", "server", "server.ts"),

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
        extensions: ['*', '.js', ".ts"]
    },

    output: {
        clean: true,
        path: path.join(__dirname, "dist", "server"),
        filename: "server.js"
    }
}