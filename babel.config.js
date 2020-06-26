module.exports = (api) => {
  return {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      "macros",
      [
        "react-intl",
        {
          messagesDir: "./build/messages",
          extractSourceLocation: true,
          removeDefaultMessage: false,
        },
      ],
    ],
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-react",
        {
          runtime: "classic",
          development: !api.env("production"),
        },
      ],
      [
        "@babel/preset-env",
        {
          debug: false,
          modules: api.env("test") ? "commonjs" : false,
          useBuiltIns: "entry",
          corejs: 3,
        },
      ],
    ],
  };
};
