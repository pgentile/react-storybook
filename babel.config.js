module.exports = api => {
  api.cache(true);

  return {
    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            browsers: [
              "since 2015",
              "last 3 chrome versions",
              "last 3 firefox versions",
              "last 3 safari versions",
              "last 3 edge versions",
              "last 3 ChromeAndroid versions",
              "last 3 Android versions",
              "last 3 iOS versions",
              "ie 11",
              "chrome >= 41",
              ">= 0.5% in FR",
              ">= 0.5% in CH",
              ">= 0.5% in BE",
              ">= 0.5% in DE",
              ">= 0.5% in GB"
            ]
          },
          useBuiltIns: "usage"
        }
      ],
      "@babel/preset-react"
    ],
    env: {
      test: {
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-syntax-dynamic-import",
          "require-context-hook"
        ],
        presets: [
          [
            "@babel/preset-env",
            {
              modules: "commonjs",
              targets: {
                node: true
              },
              useBuiltIns: "usage"
            }
          ],
          "@babel/preset-react"
        ]
      }
    }
  };
};
