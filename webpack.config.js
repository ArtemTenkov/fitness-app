const path = require("path");
const webpack = require("webpack");

module.exports = {
 mode: "development",
 module: {
   rules: [{
     test: /\.(js|jsx)$/,
     exclude: /node_modules/,
     loader: 'babel-loader'},

     {
      test: /\.(scss)$/,
      use: [
        {
          // Adds CSS to the DOM by injecting a `<style>` tag
          loader: 'style-loader'
        },
        {
          // Interprets `@import` and `url()` like `import/require()` and will resolve them
          loader: 'css-loader'
        },
        {
          // Loader for webpack to process CSS with PostCSS
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        },
        {
          // Loads a SASS/SCSS file and compiles it to CSS
          loader: 'sass-loader'
        }
      ]
    }
      ]      }
        
      };