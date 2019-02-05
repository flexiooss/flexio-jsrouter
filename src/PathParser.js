import {
  assert,
  isString
} from 'flexio-jshelpers'

const REGEX_URL_FRAGMENT = '[\\d\\w[\\]\\*?\\-_\\\\]*'
const REGEX_URL_REGEX = '[\\/\\d\\w[\\]\\(\\)\\*?\\-_:\\\\]*'
/**
 *
 * @type {Map<string, RegExp>}
 * @private
 */
const __memoizeRegexp = new Map()

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
   * @param {*RegExpMatchArray} regexpPath
   */
  parsePath(regexpPath) {
    const re = this.__getCompiledRegexp(regexpPath)
    if (re.test(this.path)) {
      re.lastIndex = 0
      const matches = re.exec(this.path)
      re.lastIndex = 0
      return matches
    }
    return null
  }

  __getCompiledRegexp(regexp) {
    if (!__memoizeRegexp.has(regexp)) {
      __memoizeRegexp.set(
        regexp,
        new RegExp(regexp, 'gi')
      )
    }

    return __memoizeRegexp.get(regexp)
  }

  /**
   *
   * @param params
   * @return {URL}
   */
  regexToUrl(params = []) {
    let route = this.path.replace(new RegExp('^(\\^?)(' + REGEX_URL_REGEX + ')(\\$?)$'), '$2')

    const extractGroupRegex = new RegExp('(?:(\\(' + REGEX_URL_FRAGMENT + '\\))(\\??|\\*?))', 'i')

    if (extractGroupRegex.test(route)) {
      extractGroupRegex.lastIndex = 0

      let matches = extractGroupRegex.exec(route)
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
