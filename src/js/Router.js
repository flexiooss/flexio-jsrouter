import {URLHandler} from './URL/URLHandler'
import {assertType} from '@flexio-oss/assert'
import {PathnameBuilder} from './URL/Pathname'
import {FlexUrl} from '@flexio-oss/extended-flex-types'
import {TypeCheck} from './TypeCheck'

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
    assertType(
      TypeCheck.isUrlConfiguration(urlConfiguration),
      'Router: `urlConfiguration` argument should be an instance of UrlConfiguration'
    )
    assertType(
      TypeCheck.isRouteHandler(routesHandler),
      'Router: `routesHandler` argument should be an instance of RoutesHandler'
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
   * @return {RouteBuilder}
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
   * @return {FlexUrl}
   */
  urlByRouteName(name, routeParameters) {
    return this.urlHandler.pathnameToUrl(
      this._routesHandler.pathnameByRouteName(
        name,
        routeParameters
      )
    )
  }

  /**
   *
   * @param {FlexUrl} url
   * @return {RouteWithParams}
   * @throws {RouteException}
   */
  routeByUrl(url) {
    return this._routesHandler
      .routeByPathname(
        PathnameBuilder
          .fromFlexUrl(url)
          .build()
      )
  }
}
