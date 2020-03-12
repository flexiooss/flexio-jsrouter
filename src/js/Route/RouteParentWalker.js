import {assertType, isNull, isFunction} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {RoutesHandler} from './RoutesHandler'


const __route = Symbol('__route')
const __routesHandler = Symbol('__routesHandler')


export class RouteParentWalker {
  /**
   *
   * @param {Route} route
   * @param {RoutesHandler} routesHandler
   */
  constructor(route, routesHandler) {
    assertType(
      route instanceof globalFlexioImport.io.flexio.js_router.types.Route,
      'PublicRouteHandler:constructor: `route` argument should be a Route'
    )
    assertType(
      routesHandler instanceof RoutesHandler,
      'PublicRouteHandler:constructor: `routesHandler` argument should be a RoutesHandler'
    )
    /**
     *
     * @type {Route}
     */
    this[__route] = route
    /**
     *
     * @type {RoutesHandler}
     */
    this[__routesHandler] = routesHandler
  }

  /**
   *
   * @param {RouteParentWalker~mapCallback} clb
   * @return {Array}
   */
  map(clb) {
    assertType(
      isFunction(clb),
      'RouteParentWalker:map: `clb` argument should be a Function'
    )

    const ret = []
    let route = this[__route]

    do {
      ret.push(clb(route))
      route = this.__getRouteParent(route)

    } while (!isNull(route))

    return ret
  }

  /**
   * @callback RouteParentWalker~mapCallback
   * @param {Route} route
   * @return {*}
   */

  /**
   *
   * @param {Route} route
   * @return {?Route}
   * @private
   */
  __getRouteParent(route) {
    if (isNull(route.parent())) {
      return null
    }
    return this[__routesHandler].route(route.parent())
  }
}
