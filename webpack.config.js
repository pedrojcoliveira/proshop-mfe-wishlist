const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.js",
  performance: { hints: false },
  devServer: {
    port: 4206,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  output: {
    publicPath: "http://localhost:4206/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfeWishlist",
      filename: "remoteEntry.js",
      exposes: {
        "./WishlistApp": "./src/WishlistApp.js",
        "./WishlistButton": "./src/components/WishlistButton.jsx",
        "./WishlistBadge": "./src/components/WishlistBadge.jsx",
        "./WishlistStore": "./src/store/wishlistStore.js",
      },
      remotes: {
        mfeAuth: `promise new Promise((resolve) => {
          if (window.location.port === '4206') {
            const mock = {
              isAuthenticated: () => !!localStorage.getItem('userInfo'),
              getUser:   () => { try { return JSON.parse(localStorage.getItem('userInfo')); } catch(e) { return null; } },
              isAdmin:   () => { try { return JSON.parse(localStorage.getItem('userInfo'))?.isAdmin === true; } catch(e) { return false; } },
              setUser:   (data) => { localStorage.setItem('userInfo', JSON.stringify(data)); },
              logout:    () => { localStorage.removeItem('userInfo'); localStorage.removeItem('cart'); },
              subscribe: () => () => {},
            };
            resolve({ get: () => Promise.resolve(() => ({ __esModule: true, default: mock })), init: () => {} });
            return;
          }
          const script = document.createElement('script');
          script.src = 'http://localhost:4201/remoteEntry.js';
          script.onload = () => resolve({ get: (req) => window.mfeAuth.get(req), init: (arg) => { try { window.mfeAuth.init(arg); } catch(e) {} } });
          script.onerror = () => resolve({ get: () => Promise.resolve(() => ({ __esModule: true, default: null })), init: () => {} });
          document.head.appendChild(script);
        })`,
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "react-router-dom": { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
