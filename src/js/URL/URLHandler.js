import {Pathname, PathnameBuilder} from './Pathname'
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
   * @return {Pathname}
   * @constructor
   */
  urlToPathname(url) {
    return PathnameBuilder.fromURL(url).build()
  }

  /**
   *
   * @param {Location} location
   * @return {Pathname}
   * @constructor
   */
  locationToPathname(location) {
    return new PathnameBuilder().value(location.pathname).build()
  }

  /**
   *
   * @param {Pathname} pathname
   * @return {FlexUrl}
   */
  pathnameToUrl(pathname) {
    return globalFlexioImport.io.flexio.extended_flex_types
      .FlexUrlBuilder
      .fromURL(new URLExtended(pathname.value(), this.__urlConfiguration.origin()))
      .build()
  }
}
