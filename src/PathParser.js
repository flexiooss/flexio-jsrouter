// import {
//   //   should,
//   //   isObject,
//   matchAll
// } from 'flexio-jshelpers'

/**
 *
 * @class PathParser
 *
 */
class PathParser {
  parsePath(path, regex) {
    const re = new RegExp(regex, 'gi')
    if (re.test(path)) {
      re.lastIndex = 0
      return re.exec(path)
    }
    return false
  }
  pathToUrl(path, params) {
    params = params || ['toto', 'tutu']
    console.log('pathToUrl')

    path = path.replace('$', '')
    path = path.replace('^', '')
    if (params.length) {
      path = path.replace('/?', '/')
    }

    let re = new RegExp(/(?:(\([\d\w[\]\\*?]*\))(\??|\*?))/)

    if (re.test(path)) {
      console.log(re.lastIndex)

      re.lastIndex = 0

      var matches = re.exec(path)

      console.log(matches)

      while (matches && matches.length) {
        let p = params.shift()

        if (matches[2] && p) {
          path = path.replace(matches[0], p)
        } else if (matches[2] && !p) {
          path = path.replace(matches[0], '')
        } else if (!matches[2] && p) {
          path = path.replace(matches[1], p)
        }

        matches = re.exec(path)
      }
    }
    console.log(path)
    return path.replace(/\/\??$/, '')
  }
}
export {
  PathParser
}
