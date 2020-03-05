const basicPlugins = ["@babel/plugin-proposal-class-properties", "macros"];

const basicPresets = ["@babel/preset-typescript"];

module.exports = api => {
  api.cache(true);

  return {
    plugins: [
      ...basicPlugins,
      [
        "react-intl",
        {
          messagesDir: "./build/messages",
          extractSourceLocation: true
        }
      ]
    ],
    presets: [
      ...basicPresets,
      [
        "@babel/preset-env",
        {
          debug: false,
          modules: false,
          useBuiltIns: "entry",
          corejs: 3
        }
      ],
      "@babel/preset-react"
    ],
    env: {
      test: {
        plugins: [...basicPlugins],
        presets: [
          ...basicPresets,
          [
            "@babel/preset-env",
            {
              modules: "commonjs",
              useBuiltIns: "entry",
              corejs: 2
            }
          ],
          "@babel/preset-react"
        ]
      }
    }
  };
};
