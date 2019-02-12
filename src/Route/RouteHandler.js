import {assert} from 'flexio-jshelpers'
import {Route} from './Route'
import {RouteCompiled} from './RouteCompiled'
import {UrlTemplateRegexp} from '../TemplateUrl/UrlTemplateRegexp'
import {RouteNotFoundException} from '../../RouteNotFoundException'
import {PathNameParser} from '../UrlParser'
import {RouteWithParams} from './RouteWithParams'

/**
 * @implements {RouteHandlerInterface}
 * @class RouteHandler
 */
export class RouteHandler {
  constructor() {
    /**
     *
     * @type {Map<string, RouteCompiled>}
     * @property
     * @private
     */
    this.__routes = new Map()
  }

  /**
   *
   * @return {Map<string, RouteCompiled>}
   */
  get routes() {
    return this.__routes
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
      !this.__routes.has(route.name),
      'flexio-jsrouter:RoutesHandler:addRoute: route name `%s`  already exists',
      route.name
    )
    return this.__registerRoute(route)
  }

  /**
   *
   * @param {Route} route
   * @return {RouteHandler}
   * @private
   */
  __registerRoute(route) {
    this.__routes.set(
      route.name,
      new RouteCompiled(route, UrlTemplateRegexp.regexpFromUrlTemplate(route.urlTemplate))
    )
    return this
  }

  /**
   *
   * @param {string} name
   * @return {RouteHandler}
   */
  removeRoute(name) {
    this.__routes.delete(name)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {boolean}
   */
  hasRoute(name) {
    return this.__routes.has(name)
  }

  /**
   *
   * @param {string} name
   * @return {Route}
   */
  route(name) {
    if (!this.hasRoute(name)) {
      throw new RouteNotFoundException(name, 'Route not found with name : ' + name)
    }
    return this.__routes.get(name).route
  }

  /**
   *
   * @param {PathName} pathname
   * @return {RouteWithParams}
   * @throws {RouteNotFoundException}
   */
  routeByPathname(pathname) {
    var route = null
    var params = null
    var isFound = false

    this.__routes.forEach((routeCompiled) => {
      let matches = new PathNameParser(pathname).execWith(routeCompiled.regexp)

      if (isFound === false && matches !== null) {
        route = routeCompiled.route
        params = matches.groups
        isFound = true
      }
    })

    if (!isFound) {
      throw new RouteNotFoundException(pathname, 'Route not found with pathname : ' + pathname)
    }
    return new RouteWithParams(route, params)
  }

  /**
   *
   * @param {string} name
   * @param {Object} routeParameters
   * @param {?PartialUrl} partialUrl
   * @return {string}
   */
  urlByName(name, routeParameters, partialUrl) {
    if (!this.__routes.has(name)) {
      throw new RouteNotFoundException(name, 'Route not found with name : ' + name)
    }
    const routeCompiled = this.__routes.get(name)
    const url = UrlTemplateRegexp.UrlFromUrlTemplate(routeCompiled.route.urlTemplate, routeParameters)
    return url
  }
}
