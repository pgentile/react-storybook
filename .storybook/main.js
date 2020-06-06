const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  stories: ["../src/**/*.stories.(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-viewport",
    "storybook-addon-i18n/register",
  ],
  webpack: async (config, { configType }) => {
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".tsx"];

    const modulesToTranspile = [
      "query-string",
      "strict-uri-encode",
      "@storybook",
      "react-use",
      "callbag-subscribe",
      "react-spring",
      "react-intl",
    ];

    const modulesToTranspilePattern = `[/\\\\]node_modules[/\\\\](${modulesToTranspile.join("|")})[/\\\\]`;

    config.module.rules.unshift({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader?cacheDirectory",
        },
      ],
    });
    config.module.rules.unshift({
      test: /\.[jt]sx?$/,
      include: [new RegExp(modulesToTranspilePattern), __dirname],
      use: [
        {
          loader: "babel-loader?cacheDirectory",
        },
      ],
    });

    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: "global",
              localIdentName: "[local]-[hash:base64:5]",
            },
            importLoaders: 2,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: [require("autoprefixer"), require("cssnano")],
          },
        },
        {
          loader: "sass-loader", // compiles Sass to CSS
        },
      ],
    });

    /*
    config.module.rules.push({
      test: /\.(svg|png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024 * 8
          }
        }
      ]
    });
    */

    if (configType === "PRODUCTION") {
      config.devtool = "source-map";
    }

    config.optimization.splitChunks.cacheGroups = {
      corejs: {
        test: /[\\/]node_modules[\\/]core-js/,
        name: "polyfills",
        chunks: "all",
      },
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)\//,
        name: "react",
        chunks: "all",
      },
    };

    let productionPlugins = [];
    if (configType === "PRODUCTION") {
      productionPlugins = [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          generateStatsFile: true,
          openAnalyzer: false,
          reportFilename: path.resolve(__dirname, "../build/analyzer/report.html"),
          statsFilename: path.resolve(__dirname, "../build/analyzer/stats.json"),
        }),
      ];
    }

    config.plugins = [...config.plugins, ...productionPlugins];

    return config;
  },
};
