import {URLHandler} from './URL/URLHandler'
import {assertType} from '@flexio-oss/assert'
import {PathnameBuilderFrom} from './URL/PathnameBuilderFrom'
import {FlexUrl} from '@flexio-oss/extended-flex-types'
import {TypeCheck} from './TypeCheck'
import {RouteHandler} from './Route/RouteHandler'

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
  constructor(urlConfiguration) {
    assertType(
      TypeCheck.isUrlConfiguration(urlConfiguration),
      'Router: `urlConfiguration` argument should be an instance of UrlConfiguration'
    )

    /**
     *
     * @type {UrlConfiguration}
     * @private
     */
    this.__urlConfiguration = urlConfiguration
    /**
     *
     * @type {RouteHandler}
     * @private
     */
    this.__routesHandler = new RouteHandler(urlConfiguration)

    /**
     *
     * @type {URLHandler}
     * @private
     */
    this.__urlHandler = new URLHandler(this.__urlConfiguration)

  }

  /**
   *
   * @return {RouteBuilder}
   */
  routeBuilder() {
    return this.__routesHandler.routeBuilder()
  }

  /**
   *
   * @return {UrlConfiguration}
   */
  get urlConfiguration() {
    return this.__urlConfiguration
  }

  /**
   *
   * @return {URLHandler}
   */
  get urlHandler() {
    return this.__urlHandler
  }

  /**
   *
   * @param {Route} route
   * @return {Router}
   */
  addRoute(route) {
    this.__routesHandler.addRoute(route)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {Router}
   */
  removeRoute(name) {
    this.__routesHandler.removeRoute(name)
    return this
  }

  /**
   *
   * @param name
   * @return {Route}
   */
  route(name) {
    return this.__routesHandler.route(name)
  }

  /**
   *
   * @param {string} name
   * @param {Object} routeParameters
   * @return {FlexUrl}
   */
  urlByRouteName(name, routeParameters) {
    return this.urlHandler.pathnameToUrl(
      this.__routesHandler.pathnameByRouteName(
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
    return this.__routesHandler
      .routeByPathname(
        PathnameBuilderFrom
          .FlexUrl(url)
          .build()
      )
  }
}
