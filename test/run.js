'use strict'
const node = process.execPath
const cp = require('child_process')
const execFile = cp.execFile
const bin = require.resolve('../bin/run.js')
const tap = require('tap')


const run = (args, options, cb) => {
  if (options && options.env) {
    options.env = Object.keys(process.env).reduce((env, k) => {
      if (env[k] === undefined) {
        env[k] = process.env[k]
      }
      return env
    }, options.env)
  }

  return execFile(node, [bin].concat(args), options, cb)
}

tap.test('Simple use', (t) => {
  t.test('with no args', (t) => {
    run([], {env:{_TAP_IS_TTY: '1'}}, (er, o, e) => {
      t.match(er, null)
      t.match(o, /^Hello EDL/)
      t.end()
    })
  })
  t.end()
})
