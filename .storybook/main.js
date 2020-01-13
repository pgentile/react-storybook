module.exports = {
  stories: [
    "../src/**/*.stories.(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
    "@storybook/addon-docs"
  ],
  webpack: async (config, { configType }) => {
    config.resolve.extensions = [
      ...config.resolve.extensions,
      ".ts",
      ".tsx"
    ];

    const modulesToTranspile = [
      "query-string",
      "strict-uri-encode",
      "@storybook",
      "loki",
      "react-use",
      "callbag-subscribe",
      "react-spring",
      "react-intl"
    ];

    const modulesToTranspilePattern = `[/\\\\]node_modules[/\\\\](${modulesToTranspile.join("|")})[/\\\\]`;

    config.module.rules.unshift({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader?cacheDirectory"
        }
      ]
    });
    config.module.rules.unshift({
      test: /\.[jt]sx?$/,
      include: new RegExp(modulesToTranspilePattern),
      use: [
        {
          loader: "babel-loader?cacheDirectory"
        }
      ]
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
              localIdentName: "[local]-[hash:base64:5]"
            },
            importLoaders: 2,
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

    if (process.env.NODE_ENV === "production") {
      config.devtool = "source-map";
    }

    config.optimization = config.optimization || {};
    config.optimization.minimize = false;

    return config;
  }
};
