'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PATH: '"http://localhost:3010/"',
  ASSETS_PATH: '"http://localhost:3015/"'
})
