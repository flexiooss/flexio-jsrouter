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
 * @class RouterService
 *
 */
class RouterService {
  constructor() {
    this._routesHandler = new RoutesHandler()
    this._location = window.location
    this._PathParser = PathParser
    this._HashParser = HashParser
    this._QueryParser = QueryParser
  }

  setRoute() {
    this._location = window.location
  }

  hash() {
    return this._location.hash.substr(1)
  }

  path() {
    return this._location.pathname
    // return this._location.pathname.substr(1)
  }

  setRoutes(routes) {
    this._routesHandler.setRoutes(routes)
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

  routeObjectByPath() {
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
  RouterService
}
