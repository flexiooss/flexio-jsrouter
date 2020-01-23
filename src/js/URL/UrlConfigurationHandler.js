import {isNull, assertType, assert} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'


const __urlConfiguration = Symbol('__urlConfiguration')


export class UrlConfigurationHandler {
  /**
   *
   * @param {UrlConfiguration} urlConfiguration
   */
  constructor(urlConfiguration) {
    assertType(
      urlConfiguration instanceof globalFlexioImport.io.flexio.js_router.types.UrlConfiguration,
      'UrlConfigurationHandler `urlConfiguration` argument should be a UrlConfiguration'
    )
    /**
     *
     * @type {UrlConfiguration}
     * @private
     */
    this[__urlConfiguration] = urlConfiguration

    assert(
      !isNull(this[__urlConfiguration].protocol()),
      'UrlConfigurationHandler: UrlConfiguration should have a protocol'
    )
    assert(
      !isNull(this[__urlConfiguration].hostname()),
      'UrlConfigurationHandler: UrlConfiguration should have a hostname'
    )
  }

  /**
   *
   * @return {string}
   * @private
   */
  __protocolClean() {
    return `${this[__urlConfiguration].protocol().replace(':', '')}`
  }

  /**
   *
   * @return {string}
   * @private
   */
  __pathnameClean() {
    if (!isNull(this[__urlConfiguration].pathname())) {
      return `/${this[__urlConfiguration].pathname().replace(/\//, '')}/`
    }
    return ''
  }

  /**
   *
   * @return {string}
   */
  pathnameString() {
    return this.__pathnameClean()
  }

  /**
   *
   * @return {string}
   */
  host() {
    return `${this[__urlConfiguration].hostname()}${(this[__urlConfiguration].port() !== null && this[__urlConfiguration].port() !== '') ? ':' + this[__urlConfiguration].port() : ''}`
  }

  /**
   *
   * @return {string}
   */
  origin() {
    return `${this.__protocolClean()}://${this.host()}`
  }

  /**
   * @return {string}
   */
  baseUrl() {
    return `${this.origin()}${this.__pathnameClean()}`
  }
}
