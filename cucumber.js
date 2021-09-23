const common = `
  src/__tests__/features/**/*.feature
  --require-module ts-node/register
  --require src/__tests__/step_definitions/**/*.ts
  --require src/__tests__/world.ts
  --format summary
  --format @cucumber/pretty-formatter
  --format cucumber-console-formatter
  --exit
  --publish-quiet
`

module.exports = {
  default: common,
}
