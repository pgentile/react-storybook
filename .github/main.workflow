workflow "Validate" {
  on = "push"
  resolves = [
    "Test",
    "Build",
  ]
}

action "Install" {
  uses = "docker://node:10"
  args = "yarn"
}

action "Lint" {
  uses = "docker://node:10"
  args = "yarn lint"
  needs = ["Install"]
}

action "Test" {
  uses = "docker://node:10"
  needs = ["Install"]
  args = "yarn test"
}

action "Build" {
  uses = "docker://node:10"
  needs = ["Lint", "Test"]
  args = "yarn storybook:build"
}
