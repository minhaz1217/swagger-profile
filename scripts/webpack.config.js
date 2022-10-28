const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
module.exports = {
    entry: {
        popup: './src/popup/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, '../dist/manifest-v2'),
        filename: 'bundle.[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/popup/index.html',
            filename: 'popup/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                    filter: async (resourcePath) => {
                        if (resourcePath.includes("manifest-v2.json") ||
                            resourcePath.includes("manifest-common.json")) {
                            return false;
                        }
                        return true;
                    },
                }
            ]
        }),

        new MergeJsonWebpackPlugin({
            files: ["public/manifest-common.json", "public/manifest-v2.json"],
            output: {
                fileName: "manifest.json",
            },
        }),
    ]
};