import {URLHandler} from './URL/URLHandler'
import {assertType} from '@flexio-oss/assert'
import {PathnameBuilderFrom} from './URL/PathnameBuilderFrom'
import {FlexUrl} from '@flexio-oss/extended-flex-types'
import {TypeCheck} from './TypeCheck'
import {PublicRouteHandler} from './PublicRouteHandler'
import {RoutesCompiledHandler} from './Route/RoutesCompiledHandler'
import {RoutesHandler} from './Route/RoutesHandler'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
 *
 * @class Router
 * @implements {RoutesHandler}
 *
 */
export class Router extends RoutesHandler {
  /**
   * @param {UrlConfiguration} urlConfiguration
   * @param {RoutesCompiledHandler} routesHandler
   */
  constructor(urlConfiguration) {
    super()
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
     * @type {RoutesCompiledHandler}
     * @private
     */
    this.__routesHandler = new RoutesCompiledHandler(urlConfiguration)

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
  urlConfiguration() {
    return this.__urlConfiguration
  }

  /**
   *
   * @return {URLHandler}
   */
  urlHandler() {
    return this.__urlHandler
  }

  /**
   *
   * @param {Route} route
   * @return {PublicRouteHandler}
   */
  addRoute(route) {
    return this.__routesHandler.addRoute(route)
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
   * @param {string} name
   * @return {Route}
   */
  route(name) {
    return this.__routesHandler.route(name)
  }

  /**
   *
   * @param {string} name
   * @param {Object} [routeParameters={}]
   * @return {FlexUrl}
   */
  urlByRouteName(name, routeParameters={}) {
    return this.urlHandler().pathnameToUrl(
      this.__routesHandler.pathnameByRouteName(
        name,
        globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject(routeParameters).build()
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
