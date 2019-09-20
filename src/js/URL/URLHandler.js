import {PathName} from './PathName'
import {URLExtended} from '@flexio-oss/extended-flex-types'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class URLHandler {
  /**
   *
   * @param {UrlConfiguration} urlConfiguration
   */
  constructor(urlConfiguration) {
    /**
     *
     * @type {UrlConfiguration}
     * @private
     */
    this.__urlConfiguration = urlConfiguration
  }

  /**
   *
   * @param {URLExtended} url
   * @return {PathName}
   * @constructor
   */
  urlToPathname(url) {
    return new PathName(url.pathname)
  }

  /**
   *
   * @param {Location} location
   * @return {PathName}
   * @constructor
   */
  locationToPathname(location) {
    return new PathName(location.pathname)
  }

  /**
   *
   * @param {PathName} pathname
   * @return {FlexUrl}
   */
  pathnameToUrl(pathname) {
    return new globalFlexioImport.io.flexio.extended_flex_types.types
      .FlexUrlBuilder()
      .value(new URLExtended(pathname.value, this.__urlConfiguration.origin()).href)
      .build()
  }
}
