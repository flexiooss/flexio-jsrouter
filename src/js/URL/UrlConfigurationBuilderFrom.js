import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class UrlConfigurationBuilderFrom {
  /**
   *
   * @param {Location} location
   * @return UrlConfigurationBuilder
   */
  static Location(location) {
    return new globalFlexioImport.io.flexio.js_router.types.UrlConfigurationBuilder()
      .protocol(location.protocol)
      .hostname(location.hostname)
      .port(location.port)
  }
}
