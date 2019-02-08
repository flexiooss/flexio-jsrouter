import {
  assert,
  isString
} from 'flexio-jshelpers'

export class UrlParser {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    assert(isString(url),
      'PathParser:constructor: `path` argument assert be a String, `%s` given',
      typeof url
    )
    /**
     *
     * @type {string}
     * @private
     */
    this.__url = url
  }

  /**
   *
   * @return {string}
   */
  get url() {
    return this.__url
  }

  /**
   *
   * @param {RegExp} regexp
   * @return {?RegExpMatchArray}
   */
  execWith(regexp) {
    if (this.__resetRegexp(regexp).test(this.url)) {
      return this.__resetRegexp(regexp).exec(this.url)
    }
    return null
  }

  __resetRegexp(regexp) {
    regexp.lastIndex = 0
    return regexp
  }
}
