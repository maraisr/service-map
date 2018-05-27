const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    context: join(__dirname, 'src/public'),

    entry: {
        main: './index.tsx'
    },

    output: {
        filename: "[name].[hash].bundle.js",
        path: join(__dirname, 'dist/public')
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/, use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    })]
}