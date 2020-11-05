const {
  override,
  addWebpackPlugin,
  addWebpackAlias,
  useEslintRc
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
  // addWebpackModuleRule({
  //   test: /\.(md)$/,
  //   loader: 'eslint-loader',
  //   enforce: 'pre',
  //   include: [path.join(__dirname, 'src')],
  //   options: {
  //     fix: true
  //   }
  // }),
  addWebpackAlias({
    '@src': resolve('./src')
  }),
  useEslintRc('./.eslintrc.js')
)
