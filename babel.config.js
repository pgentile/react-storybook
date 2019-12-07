module.exports = api => {
  api.cache(true);

  return {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-dynamic-import",
      [
        "react-intl",
        {
          messagesDir: "./build/messages",
          extractSourceLocation: true
        }
      ]
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: "entry",
          corejs: 2
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
