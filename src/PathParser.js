import {
  assert,
  isString
} from 'flexio-jshelpers'

const REGEX_URL_FRAGMENT = '[\\d\\w[\\]\\*?\\-_\\\\]*'
const REGEX_URL_REGEX = '[\\/\\d\\w[\\]\\(\\)\\*?\\-_:\\\\]*'

/**
 *
 * @class PathParser
 * @description PathParser can parse path with Regex or reverse regex for return
 *  path with params
 * a regexp path an be described as follows : '^/page/([\\-_\\w]*)/?([\\d]*)?/?$'
 *
 * @param {String} path: '/page/param1/param2',
 *
 *
 */

class PathParser {
  constructor(path) {
    assert(isString(path),
      'PathParser:constructor: `path` argument assert be a String, `%s` given',
      typeof path
    )

    Object.defineProperty(this, 'path', {
      enumerable: true,
      configurable: false,
      writable: false,
      value: path
    })
  }

  /**
     *
     * @param {*} regexpPath
     */
  parsePath(regexpPath) {
    const re = new RegExp(regexpPath, 'gi')
    if (re.test(this.path)) {
      re.lastIndex = 0
      return re.exec(this.path)
    }
    return false
  }

  regexToSring(params) {
    params = params || []

    var route = this.path.replace(new RegExp('^(\\^?)(' + REGEX_URL_REGEX + ')(\\$?)$'), '$2')

    const extractGroupRegex = new RegExp('(?:(\\(' + REGEX_URL_FRAGMENT + '\\))(\\??|\\*?))', 'i')

    if (extractGroupRegex.test(route)) {
      extractGroupRegex.lastIndex = 0

      var matches = extractGroupRegex.exec(route)
      while (matches && matches.length) {
        let p = params.shift()

        if (matches[2] && p) {
          route = route.replace(matches[0], this._checkParam(p, matches[1]))
        } else if (matches[2] && !p) {
          route = route.replace(matches[0], '')
        } else if (!matches[2] && p) {
          route = route.replace(matches[1], this._checkParam(p, matches[1]))
        } else {
          assert(!!(matches[2] && p),
            'PathParser:pathToUrl: this route `%s` have required param(s)',
            this.path
          )
        }

        matches = extractGroupRegex.exec(route)
      }
    }

    return route.replace(/\?/g, '').replace(/\/*$/g, '')
  }

  _checkParam(param, regex) {
    regex = regex.replace(new RegExp('^(\\(?)(' + REGEX_URL_FRAGMENT + ')(\\)?)$'), '$2')

    assert(!!(new RegExp('^' + regex + '$', 'ig').test(param)),
      'PathParser:_checkParam: ̀ argument : `%s` not match with `regex` argument : `%s`',
      param,
      regex
    )

    return param
  }
}

export {
  PathParser
}
