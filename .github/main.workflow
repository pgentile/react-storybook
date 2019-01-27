workflow "Validate" {
  on = "push"
  resolves = ["Lint"]
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
