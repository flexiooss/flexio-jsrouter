import {assertType, isNull} from '@flexio-oss/assert'
import {TypeCheck} from './TypeCheck'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {RouteValidator} from './Route/RouteValidator'

const __route = Symbol('__route')
const __routesHandler = Symbol('__routesHandler')

export class PublicRouteHandler {
  /**
   *
   * @param {Route} route
   * @param {RoutesHandler} routesHandler
   */
  constructor(route, routesHandler) {
    assertType(
      TypeCheck.isRoute(route),
      'PublicRouteHandler:constructor: `route` argument should be a Route'
    )
    assertType(
      TypeCheck.isRoutesHandler(routesHandler),
      'PublicRouteHandler:constructor: `routesHandler` argument should be a RoutesHandler'
    )
    this[__route] = route
    this[__routesHandler] = routesHandler
  }

  /**
   *
   * @return {string}
   */
  name() {
    return this[__route].name()
  }

  /**
   *
   * @return {string}
   */
  urlTemplate() {
    return this[__route].urlTemplate()
  }

  /**
   *
   * @return {?string}
   */
  parent() {
    return this[__route].parent()
  }

  /**
   *
   * @param {Route} route
   * @return {PublicRouteHandler}
   */
  addRoute(route) {
    new RouteValidator().isValid(route)

    assertType(
      isNull(route.parent()),
      'PublicRouteHandler:addRoute: route.parent property should be null'
    )

    return this[__routesHandler].addRoute(
      globalFlexioImport.io.flexio.js_router.types.RouteBuilder.from(route)
        .parent(this.name())
        .build()
    )

  }

}
