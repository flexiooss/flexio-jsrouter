import {URLHandler} from './URL/URLHandler'
import {assert} from '@flexio-oss/assert'
import {UrlConfiguration} from './UrlConfiguration'
import {PathName} from './URL/PathName'

/**
 *
 * @class Router
 *
 */
export class Router {
  /**
   * @param {UrlConfiguration} urlConfiguration
   * @param {RouteHandler} routesHandler
   */
  constructor(urlConfiguration, routesHandler) {
    assert(
      urlConfiguration instanceof UrlConfiguration,
      'Router: `urlConfiguration` argument should be an instance of UrlConfiguration'
    )
    /**
     *
     * @type {UrlConfiguration}
     * @private
     */
    this._urlConfiguration = urlConfiguration
    /**
     *
     * @type {RouteHandler}
     * @private
     */
    this._routesHandler = routesHandler
    /**
     *
     * @type {URLHandler}
     * @private
     */
    this._urlHandler = new URLHandler(this._urlConfiguration)

  }

  /**
   *
   * @return {Route.}
   */
  routeBuilder() {
    return this._routesHandler.routeBuilder()
  }

  /**
   *
   * @return {UrlConfiguration}
   */
  get urlConfiguration() {
    return this._urlConfiguration
  }

  /**
   *
   * @return {URLHandler}
   */
  get urlHandler() {
    return this._urlHandler
  }

  /**
   *
   * @param {Route} route
   * @return {Router}
   */
  addRoute(route) {
    this._routesHandler.addRoute(route)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {Router}
   */
  removeRoute(name) {
    this._routesHandler.removeRoute(name)
    return this
  }

  /**
   *
   * @param name
   * @return {Route}
   */
  route(name) {
    return this._routesHandler.route(name)
  }

  /**
   *
   * @param {string} name
   * @param {Object} routeParameters
   * @return {URLExtended}
   */
  urlByRouteName(name, routeParameters) {
    // TODO handle partialUrl
    return this.urlHandler.pathnameToUrl(
      this._routesHandler.pathnameByRouteName(
        name,
        routeParameters)
    )
  }

  /**
   *
   * @param {string} pathname
   * @return {RouteWithParams}
   * @throws {RouteNotFoundException}
   */
  routeByPathname(pathname) {
    return this._routesHandler.routeByPathname(new PathName(pathname))
  }
}
