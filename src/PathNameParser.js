import {assert} from 'flexio-jshelpers'
import {PathName} from './URL/PathName'

export class PathNameParser {
  /**
   *
   * @param {PathName} pathName
   */
  constructor(pathName) {
    assert(pathName instanceof PathName,
      'PathParser:constructor: `path` argument assert be a String, `%s` given',
      typeof pathName
    )
    /**
     *
     * @type {PathName}
     * @private
     */
    this.__pathname = pathName
  }

  /**
   *
   * @return {PathName}
   */
  get pathname() {
    return this.__pathname
  }

  /**
   *
   * @param {RegExp} regexp
   * @return {?RegExpMatchArray}
   */
  execWith(regexp) {
    if (this.__resetRegexp(regexp).test(this.pathname.value)) {
      return this.__resetRegexp(regexp).exec(this.pathname.value)
    }
    return null
  }

  __resetRegexp(regexp) {
    regexp.lastIndex = 0
    return regexp
  }
}
