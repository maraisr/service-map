const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: join(__dirname, 'src/public'),

	entry: {
		main: ['./style.scss', './index.tsx']
	},

	output: {
		filename: '[name].[hash].bundle.js',
		path: join(__dirname, 'dist/public')
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.scss']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
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
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
							importLoaders: 1,
							localIdentName: '__[sha512:hash:base64:10]'
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	]
};
