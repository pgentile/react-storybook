const path = require("path");

module.exports = {
  process(src, filename, config) {
    const relativeFilename = path.relative(config.rootDir, filename);
    const mockFilename = `/static/mocks/images/${relativeFilename}`;
    return `module.exports = ${JSON.stringify(mockFilename)};`;
  }
};
