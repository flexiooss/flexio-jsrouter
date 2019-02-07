import {RoutesHandler} from './RoutesHandler'
import {PathParser} from './PathParser'
import {PublicRoutesHandler} from './PublicRoutesHandler'
import {RouteWithParams} from './RouteWithParams'
import {
  HashParser
} from './HashParser'
import {
  QueryParser
} from './QueryParser'
import {RouteNotFoundException} from '../RouteNotFoundException'

/**
 *
 * @class Router
 *
 */
export class Router {
  /**
   *
   * @param {RoutesHandlerInterface} routesHandler
   */
  constructor(routesHandler) {
    this._routesHandler = routesHandler
    /**
     *
     * @type {?BrowserLocation}
     * @private
     */
    this._browserLocation = null
    this._PathParser = PathParser
    // this._HashParser = HashParser
    // this._QueryParser = QueryParser
  }

  /**
   *
   * @return {PublicRoutesHandler}
   */
  routeHandler() {
    return new PublicRoutesHandler(this)
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
   * @param params
   * @param queryParams
   * @param hash
   * @return {string}
   */
  urlByRouteName(name, params, queryParams, hash) {
    return new this._PathParser(this.route(name).path).regexToUrl(params)
  }

  /**
   *
   * @param {string} url
   * @return {RouteWithParams}
   */
  routeByUrl(url) {
    var route = null
    var params = null
    const isFound = this._routesHandler.forRoutes((r, key, map) => {
      let matches = new this._PathParser(url).parsePath(r.regexp)
      if (matches !== null) {
        route = r
        params = matches.groups
        return true
      }
      return false
    })
    if (!isFound) {
      throw new RouteNotFoundException(url, 'Url not found')
    }
    return new RouteWithParams(route, params)
  }
}
