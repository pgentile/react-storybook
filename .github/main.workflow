workflow "Validate" {
  on = "push"
  resolves = [
    "Test",
    "Build",
    "Post-validate"
  ]
}

action "Install" {
  uses = "docker://node:10"
  args = "yarn"
}

action "Lint" {
  uses = "docker://node:10"
  needs = ["Install"]
  args = "yarn ci:validate:lint"
}

action "Test" {
  uses = "docker://node:10"
  needs = ["Install"]
  args = "yarn ci:validate:test"
}

action "Build" {
  uses = "docker://node:10"
  needs = ["Lint", "Test"]
  args = "yarn ci:build"
}

action "Post-validate" {
  uses = "docker://node:10"
  needs = ["Build"]
  args = "yarn ci:post-validate"
}
