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
              "last 3 chrome versions",
              "last 3 firefox versions",
              "last 2 safari versions",
              "last 2 edge versions"
            ],
            uglify: false
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
