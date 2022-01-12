const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = env => ({
    entry: path.join(__dirname, "src", "client", env.client_dir, "index.tsx"),

    mode: "development",

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript"
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties"
                            ],
                        },
                    },
                    "astroturf/loader"
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', ".ts", ".tsx"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            // a template is needed in order to provide a root component with the id "root" to ReactDOM
            template: path.join(__dirname, "src", "client", env.client_dir, "index.html"),
        }),
    ],

    output: {
        path: path.join(__dirname, "dist", env.client_dir),
        filename: 'index.js',
    },
});