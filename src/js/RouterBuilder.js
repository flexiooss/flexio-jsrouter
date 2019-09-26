import {Router} from './Router'
import {RouteHandler} from './Route/RouteHandler'
import {UrlConfigurationBuilder} from './UrlConfiguration'
import {assertType} from '@flexio-oss/assert'

export class RouterBuilder {
  /**
   *
   * @param {UrlConfiguration} urlConfiguration
   * @return {Router}
   * @static
   */
  static build(urlConfiguration) {
    return new Router(
      urlConfiguration,
      new RouteHandler()
    )
  }

  /**
   *
   * @param {Location} location
   * @return {Router}
   * @static
   */
  static buildFromLocation(location) {
    assertType(
      location instanceof Location,
      'RouterBuilder:buildFromLocation: `location` argument should be a `Location`'
    )
    return new Router(
      UrlConfigurationBuilder
        .fromLocation(location)
        .build(),
      new RouteHandler()
    )
  }

  /**
   *
   * @return {UrlConfigurationBuilder}
   */
  static urlConfigurationBuilder() {
    return new UrlConfigurationBuilder()
  }

}
