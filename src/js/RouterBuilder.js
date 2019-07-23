import {Router} from './Router'
import {RouteHandler} from './Route/RouteHandler'

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
      new RouteHandler())
  }
}
