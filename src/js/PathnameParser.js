import {assert} from '@flexio-oss/assert'
import {UrlConfigurationHandler} from './URL/UrlConfigurationHandler'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'


export class PathnameParser {
  /**
   *
   * @param {Pathname} pathname
   * @param {UrlConfiguration} urlConfiguration
   */
  constructor(pathname, urlConfiguration) {
    assert(
      pathname instanceof globalFlexioImport.io.flexio.js_router.types.Pathname,
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
      urlConfiguration instanceof globalFlexioImport.io.flexio.js_router.types.UrlConfiguration,
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
  pathname() {
    return this.__pathname
  }

  /**
   *
   * @param {RegExp} regexp
   * @return {?RegExpMatchArray}
   */
  execWith(regexp) {
    let realPathname = this.pathname().value()

    if (this.__urlConfigurationHandler.pathnameString() !== '') {
      realPathname = this.pathname().value().replace(
        this.__urlConfigurationHandler.pathnameString().replace(/\/$/, ''),
        ''
      )
    }

    if (realPathname === '') {
      realPathname = '/'
    }

    if (this.__resetRegexp(regexp).test(realPathname)) {
      return this.__resetRegexp(regexp).exec(realPathname)
    }
    return null
  }

  __resetRegexp(regexp) {
    return regexp
  }
}
