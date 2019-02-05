import {RoutesHandler} from './RoutesHandler'
import {PathParser} from './PathParser'
import {PublicRoutesHandler} from './PublicRoutesHandler'
import {
  HashParser
} from './HashParser'
import {
  QueryParser
} from './QueryParser'

/**
 *
 * @class Router
 *
 */
class Router {
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
  pathByRouteName(name, params, queryParams, hash) {
    return new this._PathParser(this.route(name).path).regexToUrl(params)
  }

  /**
   *
   * @param path
   * @return {{route: ?Route, params: ?array<*>}}
   */
  routeByPath(path) {
    var route = null
    var params = null
    let isRouteFound = false
    this._routesHandler.forEachRoutes((r, key, map) => {
      if (!isRouteFound) {
        let matches = new this._PathParser(path).parsePath(r.regexp)
        if (matches !== null) {
          isRouteFound = true
          route = r
          params = matches.groups
        }
      }
    })
    return {route, params}
  }

  findRouteInvoke(path) {
    const {route, params} = this.routeByPath(path)
    if (route !== null) {
      route.callback(params)
    }
  }
}

export {
  Router
}
