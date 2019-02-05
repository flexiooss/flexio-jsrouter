import {
  RoutesHandler
} from './RoutesHandler'
import {
  PathParser
} from './PathParser'
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
   * @param {RoutesHandler} routesHandler
   */
  constructor(routesHandler) {
    this._routesHandler = routesHandler
    this._browserLocation = null
    this._PathParser = PathParser
    this._HashParser = HashParser
    this._QueryParser = QueryParser
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

  withBrowserLocation(browserLocation) {
    this._browserLocation = browserLocation
    return this
  }

  route(key) {
    return this._routesHandler.route(key)
  }

  forEachRoutes(callback) {
    return this._routesHandler.forEachRoutes(callback)
  }

  urlByRouteName(routeName, params, queryParams, hash) {
    return new this._PathParser(this.route(routeName).path).regexToSring(params)
  }

  routeByPath() {
    var route = {}
    this._routesHandler.forEachRoutes((value, key, map) => {
      let matches = new this._PathParser(this.path()).parsePath(value.path)
      if (matches) {
        route = this.route(key)
        if (matches.length > 1) {
          route.param = {}
          for (let i = 1; i < matches.length; i++) {
            route.param[i] = matches[i]
          }
        }
      }
    })
    return route
  }
}

export {
  Router
}
