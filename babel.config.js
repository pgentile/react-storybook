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
          removeDefaultMessage: false
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
          useBuiltIns: "entry",
          corejs: 3
        }
      ]
    ]
  };
};
