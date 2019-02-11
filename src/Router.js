import {RouteHandler} from './Route/RouteHandler'
import {UrlParser} from './UrlParser'
import {PublicRouteHandler} from './Route/PublicRouteHandler'
import {RouteWithParams} from './Route/RouteWithParams'
import {
  HashParser
} from './HashParser'
import {
  QueryParser
} from './QueryParser'
import {RouteNotFoundException} from '../RouteNotFoundException'
import {Route} from './Route/Route'

/**
 *
 * @class Router
 *
 */
export class Router {
  /**
   *
   * @param {RouteHandlerInterface} routesHandler
   */
  constructor(routesHandler) {
    this._routesHandler = routesHandler
    /**
     *
     * @type {?BrowserLocation}
     * @private
     */
    this._browserLocation = null
    this._PathParser = UrlParser
    // this._HashParser = HashParser
    // this._QueryParser = QueryParser
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
   * @param {BrowserLocation} browserLocation
   * @return {Router}
   */
  withBrowserLocation(browserLocation) {
    this._browserLocation = browserLocation
    return this
  }

  /**
   *
   * @param key
   * @return {Route}
   */
  route(key) {
    return this._routesHandler.route(key)
  }

  /**
   *
   * @param {string} name
   * @param {Object} routeParameters
   * @param {?PartialUrl} partialUrl
   * @return {URL}
   */
  urlByName(name, routeParameters, partialUrl) {
    return this._routesHandler.urlByName(name, routeParameters, partialUrl)
  }

  /**
   *
   * @param {string} url
   * @return {RouteWithParams}
   * @throws {RouteNotFoundException}
   */
  routeByUrl(url) {
    return this._routesHandler.routeByUrl(url)
  }
}
