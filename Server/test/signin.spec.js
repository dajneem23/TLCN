'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:4000/signin',
  connections: 20, //default
  pipelining: 1, // default
  duration: 60, // default
  workers: 4
}, console.log)