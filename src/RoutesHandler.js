import {
  assert,
  isObject,
  MapExtended
} from 'flexio-jshelpers'
import {Route} from './Route'

const __routes = Symbol('__routes')

/**
 *
 * @class RoutesHandler
 */
export class RoutesHandler {
  constructor() {
    /**
     *
     * @type {Map<string, Route>}
     * @private
     */
    this['_routes'] = new Map()
  }

  /**
   *
   * @param {Route} route
   * @return {RoutesHandler}
   */
  addRoute(route) {
    assert(route instanceof Route,
      'flexio-jsrouter:RoutesHandler:addRoute : `route` argument should be an instance of Route')

    assert(
      !this._routes.has(route.name),
      'flexio-jsrouter:RoutesHandler:addRoute: route name `%s`  already exists',
      route.name
    )
    this['_routes'].set(route.name, route)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {RoutesHandler}
   */
  removeRoute(name) {
    this['_routes'].delete(name)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {boolean}
   */
  hasRoute(name) {
    return this['_routes'].has(name)
  }

  /**
   *
   * @param {string} name
   * @return {Route}
   */
  route(name) {
    return this['_routes'].get(name)
  }

  forEachRoutes(callback) {
    return this['_routes'].forEach(callback)
  }
}
