/*
This file contains the webpack config that is used for both development and production mode.
The respective configs (client.dev.webpack.config.js and client.prod.webpack.config.js)
both import this common config.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, styleLoader) => ({

    entry: path.join(__dirname, "src", "client", env.client_dir, "index.tsx"),

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    styleLoader,  // different values for development vs. production
                    {
                        loader: "css-loader",
                        options: {
                            // todo: if we want to use this (CSS modules),
                            //       only do this for files with extension ".module.css"
                            //       (so we need to add another rule to webpack)
                            // modules: {
                            //     exportLocalsConvention: "camelCase",  // convert CSS to camelCase in JS (e.g. "my-class" in CSS becomes "style.myClass" in JS)
                            //     localIdentName: "[local]__[hash:base64:5]",  // adds a unique hash to the original CSS name for modularization
                            // },
                            importLoaders: 1,  // "1" means "use PostCSS"
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-import",
                                    "tailwindcss",
                                    "postcss-preset-env",  // postcss-preset-env converts modern CSS into something most browsers can understand
                                                           // postcss-preset-env includes autoprefixer
                                ],
                            },
                        }
                    },
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
        extensions: ['*', '.js', ".ts", ".tsx", ".css"]
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
        // "filename" will be set by other .webpack.configs.js files
    }
});