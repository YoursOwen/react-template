const {
  override,
  addWebpackPlugin,
  addWebpackAlias,
  useEslintRc,
  fixBabelImports
} = require('customize-cra')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const path = require('path')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

function customCra(config) {
  console.log('customCra -> config', config.module.rules[1])
  return config
}

module.exports = override(
  customCra,
  addWebpackPlugin(
    new ProgressBarPlugin({
      format: `${chalk.green('Building')} [ ${chalk.green(
        ':bar'
      )} ] ':msg:' ${chalk.bold('(:percent)')}`,
      clear: true
    })
  ),
  addWebpackAlias({
    '@src': resolve('./src')
  }),
  useEslintRc('./.eslintrc.js'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  })
)
