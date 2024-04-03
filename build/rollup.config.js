const pkg = require("../package.json")
const { toBase64, simpleScss } = require("devby")
const pluginNodeResolve = require("@rollup/plugin-node-resolve")
const pluginCommonjs = require("@rollup/plugin-commonjs")

module.exports = {
    input: "./src/index.js",
    output: {
        name: 'Snipio',
        file: "./dist/Snipio.js",
        format: "umd",
        banner: `/*!
 * Snipio.js v${pkg.version}
 * git+https://github.com/zxl20070701/Snipio.js.git
 *
 * Copyright zxl20070701
 * Released under the MIT license
 * https://zxl20070701.github.io/notebook/home.html
 */`
    },
    plugins: [
        (function () {
            return {
                transform(source, path) {
                    if (/\.scss$/.test(path)) {
                        return `export default ${JSON.stringify(simpleScss(source))}`
                    }

                    else if (/\.html$/.test(path)) {
                        return `export default ${JSON.stringify(source)}`
                    }

                    else if (/\.png$/.test(path)) {
                        return `export default ${JSON.stringify(toBase64(path))}`
                    }

                    return
                }
            }
        })(),
        pluginNodeResolve(),
        pluginCommonjs()
    ]
}
