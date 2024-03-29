const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  core: {
    builder: "webpack5",
  },
  webpack: async (config, { configType }) => {
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
            postcssOptions: {
              plugins: [require("autoprefixer"), require("cssnano")],
            },
          },
        },
        {
          loader: "sass-loader", // compiles Sass to CSS
        },
      ],
    });

    if (configType === "PRODUCTION") {
      config.devtool = "source-map";
    }

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
