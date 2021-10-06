const pkg = require('./package.json');
const path = require('path');

module.exports = ()=>{

    return {
        entry: path.join(__dirname, "src", "index.js"),
        output: {
          filename: `${pkg.name}.js`,
          library: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
          path:path.resolve(__dirname, "dist"),
        },
        module: {
          rules: [
            {
              test: /\.?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              }
            },
          ]
        },
      }
}