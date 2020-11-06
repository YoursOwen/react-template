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

/**
 *  customize-cra bug
 * 见 https://github.com/arackaf/customize-cra/issues/175#issuecomment-610023655
 */
const eslintConfig = require('./.eslintrc.js')

const useEslintConfig = (configRules) => (config) => {
  const updatedRules = config.module.rules.map((rule) => {
    // Only target rules that have defined a `useEslintrc` parameter in their options
    if (
      rule.use &&
      // eslint-disable-next-line no-void
      rule.use.some((use) => use.options && use.options.useEslintrc !== void 0)
    ) {
      const ruleUse = rule.use[0]
      const baseOptions = ruleUse.options
      const baseConfig = baseOptions.baseConfig || {}
      const newOptions = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules }
      }
      ruleUse.options = newOptions
      return rule

      // Rule not using eslint. Do not modify.
      // eslint-disable-next-line no-else-return
    } else {
      return rule
    }
  })

  // eslint-disable-next-line no-param-reassign
  config.module.rules = updatedRules
  return config
}

module.exports = override(
  useEslintConfig(eslintConfig),
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
  // // 配置了 .env 中变量可省略
  useEslintRc(path.resolve(__dirname, '.eslintrc.js')),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  })
)
