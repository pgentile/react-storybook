import initStoryshots from "@storybook/addon-storyshots";

// Each story will generate a snapshot test

initStoryshots({
  storyKindRegex: /^(?!.*Expandable).*/,
  storyNameRegex: /(?!.*Expandable).*/
});
