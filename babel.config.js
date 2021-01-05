module.exports = (api) => {
  return {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      "macros",
      [
        "formatjs",
        {
          removeDefaultMessage: false,
          ast: true,
        },
      ],
    ],
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
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
