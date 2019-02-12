import {PathName} from './PathName'
export class URLHandler {
  /**
   *
   * @param {URL} url
   * @return {PathName}
   * @constructor
   */
  static UrlToPathname(url) {
    return new PathName(url.pathname)
  }

  /**
   *
   * @param {Location} location
   * @return {PathName}
   * @constructor
   */
  static LocationToPathname(location) {
    return new PathName(location.pathname)
  }
}
