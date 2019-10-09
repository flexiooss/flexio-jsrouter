import {assertType, isNull} from '@flexio-oss/assert'
import {RouteCompiledValidator} from './RouteCompiledValidator'
import {UrlTemplateRegexp} from '../TemplateUrl/UrlTemplateRegexp'
import {PathnameParser} from '../PathnameParser'
import {RouteException} from './RouteException'
import {TypeCheck} from '../TypeCheck'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {RouteValidator} from './RouteValidator'
import {RouteParentWalker} from './RouteParentWalker'
import {RoutesHandler} from './RoutesHandler'
import {PublicRouteHandler} from '../PublicRouteHandler'

/**
 *
 * @implements {RoutesHandler}
 */
export class RoutesCompiledHandler extends RoutesHandler {
  /**
   * @param {UrlConfiguration} urlConfiguration
   */
  constructor(urlConfiguration) {
    super()
    /**
     *
     * @type {UrlConfiguration}
     * @private
     */
    this.__urlConfiguration = urlConfiguration
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
   * @return {RouteBuilder}
   */
  routeBuilder() {
    return new globalFlexioImport.io.flexio.js_router.types.RouteBuilder()
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
   * @return {PublicRouteHandler}
   */
  addRoute(route) {
    assertType(TypeCheck.isRoute(route),
      'js-srouter:RoutesCompiledHandler:addRoute : `route` argument should be an instance of Route')

    new RouteValidator().isValid(route)

    if (

      this.__routes.has(route.name())
    ) {
      throw RouteException.ALREADY_EXISTS(route.name())
    }

    return new PublicRouteHandler(
      this.__registerRoute(route).route(),
      this
    )

  }

  /**
   *
   * @param {Route} route
   * @return {RouteCompiled}
   * @private
   */
  __registerRoute(route) {

    route = this.__ensureHierarchicalUrlTemplate(route)

    const routeCompiled = new globalFlexioImport.io.flexio.js_router.types.RouteCompiledBuilder()
      .route(route)
      .regexp(UrlTemplateRegexp.regexpFromUrlTemplate(route.urlTemplate())
      )
      .build()

    new RouteCompiledValidator().isValid(routeCompiled)

    this.__routes.set(
      route.name(),
      routeCompiled
    )

    return routeCompiled
  }

  /**
   *
   * @param {Route} route
   * @return {Route}
   * @private
   */
  __ensureHierarchicalUrlTemplate(route) {
    if (isNull(route.parent())) {
      return route
    }

    return globalFlexioImport.io.flexio.js_router.types.RouteBuilder.from(route)
      .urlTemplate(
        new RouteParentWalker(route, this)
          .map(route => route.urlTemplate())
          .reverse()
          .join('')
      )
      .build()

  }

  /**
   *
   * @param {string} name
   * @return {RoutesCompiledHandler}
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
    return this.__routes.get(name).route()
  }

  /**
   *
   * @param {Pathname} pathname
   * @return {RouteWithParams}
   * @throws {RouteException}
   */
  routeByPathname(pathname) {
    let route = null
    let params = null
    let isFound = false

    this.__routes.forEach((routeCompiled) => {

      let matches = new PathnameParser(pathname, this.__urlConfiguration).execWith(routeCompiled.regexp())

      if (isFound === false && matches !== null) {
        route = routeCompiled.route()
        params = Object.assign({}, matches.groups)
        isFound = true
      }
    })

    if (!isFound) {
      throw RouteException.NOT_FOUND(pathname.value())
    }

    return new globalFlexioImport.io.flexio.js_router.types.RouteWithParamsBuilder()
      .route(route)
      .params(params)
      .build()
  }

  /**
   *
   * @param {string} name
   * @param {Object} routeParameters
   * @return {Pathname}
   */
  pathnameByRouteName(name, routeParameters) {

    if (!this.__routes.has(name)) {
      throw RouteException.NOT_FOUND(name)
    }

    const routeCompiled = this.__routes.get(name)

    return UrlTemplateRegexp
      .pathnameFromUrlTemplate(
        routeCompiled.route().urlTemplate(),
        routeParameters
      )
  }
}
