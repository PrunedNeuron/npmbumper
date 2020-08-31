//@ts-check
"use strict";
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

/**@type {import('webpack').Configuration}*/
const config = {
	target: "node",
	entry: "./src/extension.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "extension.js",
		libraryTarget: "commonjs2",
		devtoolModuleFilenameTemplate: "../[resource-path]"
	},
	devtool: "source-map",
	externals: {
		vscode: "commonjs vscode"
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					compress: {
						drop_console: true
					},
					output: {
						comments: false
					}
				},
				extractComments: false
			})
		]
	}
};
module.exports = config;
