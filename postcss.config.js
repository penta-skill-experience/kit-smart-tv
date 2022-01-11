module.exports = {
    plugins: [
        "postcss-import",
        "tailwindcss",
        "postcss-preset-env",  // postcss-preset-env includes autoprefixer, so adding it separately is not necessary
    ],
};