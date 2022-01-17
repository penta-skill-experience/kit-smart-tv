const path = require("path");

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
        extensions: ['*', '.js', ".ts"]
    },

    output: {
        clean: true,
        path: path.join(__dirname, "dist", "server"),
        filename: "server.js"
    }
}