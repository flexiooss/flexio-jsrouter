import {assert, assertType} from '@flexio-oss/assert'
import {Route} from './Route'
import {RouteCompiled} from './RouteCompiled'
import {UrlTemplateRegexp} from '../TemplateUrl/UrlTemplateRegexp'
import {PathNameParser} from '../PathNameParser'
import {RouteWithParams} from './RouteWithParams'
import {RouteException} from './RouteException'

/**
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
   * @return {Route.}
   */
  routeBuilder() {
    return Route
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
    assertType(route instanceof Route,
      'js-srouter:RoutesHandler:addRoute : `route` argument should be an instance of Route')
    if (

      this.__routes.has(route.name)
    ) {
      throw RouteException.ALREADY_EXISTS(route.name)
    }

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
      new RouteCompiled(
        route,
        UrlTemplateRegexp.regexpFromUrlTemplate(route.urlTemplate)
      )
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
   * @throws {RouteException}
   */
  route(name) {
    if (!this.hasRoute(name)) {
      throw RouteException.NOT_FOUND(name)
    }
    return this.__routes.get(name).route
  }

  /**
   *
   * @param {PathName} pathname
   * @return {RouteWithParams}
   * @throws {RouteException}
   */
  routeByPathname(pathname) {
    let route = null
    let params = null
    let isFound = false

    this.__routes.forEach((routeCompiled) => {

      let matches = new PathNameParser(pathname).execWith(routeCompiled.regexp)

      if (isFound === false && matches !== null) {
        route = routeCompiled.route
        params = Object.assign({}, matches.groups)
        isFound = true
      }
    })

    if (!isFound) {
      throw RouteException.NOT_FOUND(pathname.value)
    }

    return new RouteWithParams(route, params)
  }

  /**
   *
   * @param {string} name
   * @param {Object} routeParameters
   * @return {PathName}
   */
  pathnameByRouteName(name, routeParameters) {

    if (!this.__routes.has(name)) {
      throw RouteException.NOT_FOUND(name)
    }

    const routeCompiled = this.__routes.get(name)

    return UrlTemplateRegexp.PathnameFromUrlTemplate(
      routeCompiled.route.urlTemplate,
      routeParameters
    )
  }
}
