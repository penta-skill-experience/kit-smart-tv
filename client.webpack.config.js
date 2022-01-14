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
        clean: true,  // clean the /dist folder before each build, so that only used files will be generated
        path: path.join(__dirname, "dist", env.client_dir),
        filename: 'bundle.[hash].js',  // use [hash] to avoid changes not showing because of browser caching
    },
});