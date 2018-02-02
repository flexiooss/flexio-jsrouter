import {
  should,
  isObject,
  MapExtended
} from 'flexio-jshelpers'

/**
 *
 * @class RoutesHandler
 *
 */
class RoutesHandler {
  constructor() {
    this._routes = new MapExtended()
    this._prevRoute = null
    this._currentRoute = null
  }

  setRoutes(routes) {
    should(
      isObject(routes),
      'flexio-jsrouter:RoutesHandler:setRoutes: `routes` argument should be an instance of Object, %s given',
      typeof routes
    )
    for (let name in routes) {
      this.addRoute(name, routes[name])
    }
  }

  addRoute(name, route) {
    should(
      'path' in route,
      'flexio-jsrouter:RoutesHandler:setRoutes: `route item` should be have a `path` entry with a String Regexp'
    )
    this._routes.set(name, route)
  }

  route(key) {
    return this._routes.get(key)
  }

  forEachRoutes(callback) {
    return this._routes.forEach(callback)
  }
}
export {
  RoutesHandler
}
