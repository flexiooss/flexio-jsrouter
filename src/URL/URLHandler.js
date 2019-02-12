import {PathName} from './PathName'

export class URLHandler {
  /**
   *
   * @param {UrlConfiguration} urlConfiguration
   */
  constructor(urlConfiguration) {
    this.__urlConfiguration = urlConfiguration
  }

  /**
   *
   * @param {URL} url
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
   * @return {URL}
   */
  pathnameToUrl(pathname) {
    return new URL(pathname.value, this.__urlConfiguration.origin())
  }
}
