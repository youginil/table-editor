const path = require('path');

module.exports = env => {
  return {
    entry: "./src/editor.ts",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "editor.js",
      library: 'te',
      libraryTarget: "umd"
    },
    mode: 'development',
    devtool: env.production ? "none" : "inline-source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"]
    },
    module: {
      rules: [
        {test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/},
        {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]}
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, ''),
      port: 9000,
      filename: 'editor.js'
    },
    watchOptions: {
      ignored: ['node_modules']
    }
  };
};
