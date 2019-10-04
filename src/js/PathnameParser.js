import {assert} from '@flexio-oss/assert'
import {TypeCheck} from './TypeCheck'
import {UrlConfigurationHandler} from './URL/UrlConfigurationHandler'

export class PathnameParser {
  /**
   *
   * @param {Pathname} pathname
   * @param {UrlConfiguration} urlConfiguration
   */
  constructor(pathname, urlConfiguration) {
    assert(
      TypeCheck.isPathname(pathname),
      'PathParser:constructor: `pathname` argument should be an instance of Pathname, `%s` given',
      typeof pathname
    )
    /**
     *
     * @type {Pathname}
     * @private
     */
    this.__pathname = pathname

    assert(
      TypeCheck.isUrlConfiguration(urlConfiguration),
      'PathParser:constructor: `urlConfiguration` argument should be an instance of UrlConfiguration, `%s` given',
      typeof urlConfiguration
    )
    /**
     *
     * @type {UrlConfigurationHandler}
     * @private
     */
    this.__urlConfigurationHandler = new UrlConfigurationHandler(urlConfiguration)
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
    let realPathname = this.pathname.value()

    if (this.__urlConfigurationHandler.pathnameString() !== '') {
      realPathname = this.pathname.value().replace(
        this.__urlConfigurationHandler.pathnameString(),
        '/'
      )
    }

    if (this.__resetRegexp(regexp).test(realPathname)) {
      return this.__resetRegexp(regexp).exec(realPathname)
    }
    return null
  }

  __resetRegexp(regexp) {
    // regexp.lastIndex = 0
    return regexp
  }
}
