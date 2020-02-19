const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const GasPlugin = require("gas-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackCleanPlugin = require("webpack-clean");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const DynamicCdnWebpackPlugin = require("dynamic-cdn-webpack-plugin");

// settings
const destination = "dist";
const htmlTemplate = "./src/client/dialog-template.html";
const htmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin();
const webpackCleanPlugin = new WebpackCleanPlugin([
  destination + "/" + "main.js"
]);

// Client entrypoints:
const clientEntrypoints = [
  {
    name: "CLIENT - main dialog",
    entry: "./src/client/main.jsx",
    filename: "main.html"
  }
];

const sharedConfigSettings = {
  module: {}
};

const eslintConfig = {
  enforce: "pre",
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: "eslint-loader",
  options: {
    cache: false,
    failOnError: false,
    fix: true
  }
};

const appsscriptConfig = {
  name: "COPY APPSSCRIPT.JSON",
  entry: "./appsscript.json",
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: "./appsscript.json"
      }
    ])
  ]
};

const clientConfig = {
  ...sharedConfigSettings,
  mode: "production",
  output: {
    path: path.resolve(__dirname, destination)
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      // eslintConfig,
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

const clientConfigs = clientEntrypoints.map(clientEntrypoint => {
  return {
    ...clientConfig,
    name: clientEntrypoint.name,
    entry: clientEntrypoint.entry,
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        filename: clientEntrypoint.filename,
        //inlineSource: ".(js|css)$" // embed all javascript and css inline
        inlineSource: "^[^(//)]+.(js|css)$"
      }),
      htmlWebpackInlineSourcePlugin,
      webpackCleanPlugin,
      new DynamicCdnWebpackPlugin()
    ]
  };
});

const serverConfig = {
  ...sharedConfigSettings,
  name: "SERVER",
  entry: "./src/server/code.js",
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: false,
          ie8: true,
          mangle: false,
          compress: {
            properties: false
          },
          output: {
            beautify: true
          }
        }
      })
    ]
  },
  output: {
    filename: "code.js",
    path: path.resolve(__dirname, destination),
    libraryTarget: "this"
  },
  module: {
    rules: [
      // eslintConfig,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new GasPlugin()]
};

module.exports = [appsscriptConfig, ...clientConfigs, serverConfig];
