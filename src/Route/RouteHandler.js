import {assert} from 'flexio-jshelpers'
import {Route} from './Route'

const __routes = Symbol('__routes')

/**
 * @implements {RouteHandlerInterface}
 * @class RouteHandler
 */
export class RouteHandler {
  constructor() {
    /**
     *
     * @type {Map<string, Route>}
     * @property
     * @private
     */
    this[__routes] = new Map()
  }

  /**
   *
   * @param {Route} route
   * @return {RouteHandler}
   */
  addRoute(route) {
    assert(route instanceof Route,
      'flexio-jsrouter:RoutesHandler:addRoute : `route` argument should be an instance of Route')

    assert(
      !this[__routes].has(route.name),
      'flexio-jsrouter:RoutesHandler:addRoute: route name `%s`  already exists',
      route.name
    )
    this[__routes].set(route.name, route)
    return this
  }

  __registerRoute(route) {

  }

  /**
   *
   * @param {string} name
   * @return {RouteHandler}
   */
  removeRoute(name) {
    this[__routes].delete(name)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {boolean}
   */
  hasRoute(name) {
    return this[__routes].has(name)
  }

  /**
   *
   * @param {string} name
   * @return {Route}
   */
  route(name) {
    return this[__routes].get(name)
  }

  /**
   *
   * @param {RouteHandler~MapCallback} callback
   */
  forEachRoutes(callback) {
    this[__routes].forEach(callback)
  }

  /**
   *
   * @param {RouteHandler~MapCallback} callback
   * @return {boolean}
   */
  forRoutes(callback) {
    const entries = this[__routes].entries()
    /**
     * @type {array<string, Route>} item
     */
    for (const item of entries) {
      if (callback(item[1], item[0], this[__routes])) {
        return true
      }
    }
    return false
  }

  /**
   * @callback RoutesHandler~MapCallback
   * @param {Route} route
   * @param {string} nameL
   * @param {Map<string, Route>} routes
   * @return {boolean}
   */
}
