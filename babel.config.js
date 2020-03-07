module.exports = api => {
  return {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "macros",
      [
        "react-intl",
        {
          messagesDir: "./build/messages",
          extractSourceLocation: true,
          removeDefaultMessage: !api.env("test")
        }
      ]
    ],
    presets: [
      "@babel/preset-react",
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          debug: false,
          modules: api.env("test") ? "commonjs" : false,
          useBuiltIns: "usage",
          corejs: 3
        }
      ]
    ]
  };
};
