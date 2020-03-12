import {Router} from './Router'
import {UrlConfigurationBuilderFrom} from './URL/UrlConfigurationBuilderFrom'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class RouterBuilder {
  /**
   *
   * @param {UrlConfiguration} urlConfiguration
   * @return {Router}
   * @static
   */
  static build(urlConfiguration) {
    return new Router(
      urlConfiguration
    )
  }

  /**
   *
   * @return {UrlConfigurationBuilder}
   */
  static urlConfigurationBuilder() {
    return new globalFlexioImport.io.flexio.js_router.types.UrlConfigurationBuilder()
  }

  /**
   *
   * @param {Location} location
   * @return {UrlConfigurationBuilder}
   */
  static urlConfigurationBuilderFromLocation(location) {
    return UrlConfigurationBuilderFrom.Location(location)
  }
}
