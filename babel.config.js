module.exports = (api) => {
  return {
    sourceType: "unambiguous",
    plugins: [
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
          modules: "auto",
          useBuiltIns: api.env("test") ? "usage" : false,
          corejs: api.env("test") ? 3 : false,
        },
      ],
    ],
  };
};
