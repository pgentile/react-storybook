// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules = [
    {
      test: /\.jsx?$/,
      include: /.*node_modules[/\\](query-string|strict-uri-encode|@storybook|loki).*/,
      use: [
        {
          loader: "babel-loader?cacheDirectory"
        }
      ]
    },
    ...storybookBaseConfig.module.rules,
    {
      test: /\.s?css$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: false,
            importLoaders: 2,
            localIdentName: '[local]-[hash:base64:5]'
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
            ],
          },
        },
        {
          loader: "sass-loader", // compiles Sass to CSS
        },
      ],
    },
    {
      test: /\.(svg|png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024 * 8
          }
        }
      ]
    }
  ];

  console.info("RULES ARE", storybookBaseConfig.module.rules);

  return storybookBaseConfig;
};
