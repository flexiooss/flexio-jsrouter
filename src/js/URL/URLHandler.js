import {PathnameBuilderFrom} from './PathnameBuilderFrom'
import {URLExtended} from '@flexio-oss/extended-flex-types'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {UrlConfigurationHandler} from './UrlConfigurationHandler'
import {PathnameValidator} from './PathnameValidator'

export class URLHandler {
  /**
   *
   * @param {UrlConfiguration} urlConfiguration
   */
  constructor(urlConfiguration) {
    /**
     *
     * @type {UrlConfigurationHandler}
     * @private
     */
    this.__urlConfigurationHandler = new UrlConfigurationHandler(urlConfiguration)
  }

  /**
   *
   * @param {URLExtended} url
   * @return {Pathname}
   * @constructor
   */
  urlToPathname(url) {
    return PathnameBuilderFrom.URL(url).build()
  }

  /**
   *
   * @param {Location} location
   * @return {Pathname}
   * @constructor
   */
  locationToPathname(location) {
    const pathname = new globalFlexioImport.io.flexio.js_router.types.PathnameBuilder()
      .value(location.pathname)
      .build()

    new PathnameValidator().isValid(pathname)
    return pathname
  }

  /**
   *
   * @param {Pathname} pathname
   * @return {FlexUrl}
   */
  pathnameToUrl(pathname) {

    return globalFlexioImport.io.flexio.extended_flex_types
      .FlexUrlBuilder
      .fromURL(
        new URLExtended(
          (this.__urlConfigurationHandler.pathnameString() + `${pathname.value().replace(/^\//, '')}`).replace(/\/$/, ''),
          this.__urlConfigurationHandler.origin())
      )
      .build()
  }

}
