import initStoryshots, { multiSnapshotWithOptions } from "@storybook/addon-storyshots";

jest.mock("./forms/useGeneratedFieldId.js");

initStoryshots({
  integrityOptions: {
    cwd: __dirname,
  },
  test: multiSnapshotWithOptions(),
});
