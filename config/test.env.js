'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_PATH: '"http://ec2-18-217-63-171.us-east-2.compute.amazonaws.com:3010/1.0/"',
  ASSETS_PATH: '"http://cwl-asset-bucket.s3-website-us-east-1.amazonaws.com"',
  SOCKET_PATH: '"http://ec2-18-217-63-171.us-east-2.compute.amazonaws.com:3010/"'
})
