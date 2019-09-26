import {assert} from '@flexio-oss/assert'
import {Pathname} from './URL/Pathname'

export class PathnameParser {
  /**
   *
   * @param {Pathname} pathname
   */
  constructor(pathname) {
    assert(pathname instanceof Pathname,
      'PathParser:constructor: `pathname` argument should be an instance of Pathname, `%s` given',
      typeof pathname
    )
    /**
     *
     * @type {Pathname}
     * @private
     */
    this.__pathname = pathname
  }

  /**
   *
   * @return {Pathname}
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
    if (this.__resetRegexp(regexp).test(this.pathname.value())) {
      return this.__resetRegexp(regexp).exec(this.pathname.value())
    }
    return null
  }

  __resetRegexp(regexp) {
    regexp.lastIndex = 0
    return regexp
  }
}
