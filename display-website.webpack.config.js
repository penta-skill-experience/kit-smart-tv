const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/client/config_website/index.tsx'),

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
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

    output: {
        path: path.resolve(__dirname, './dist/config_website'),
        filename: 'index.js',
    },
};