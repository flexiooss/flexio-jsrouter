import {isObject, assertType, isNull} from '@flexio-oss/assert'
import {Route} from './Route'

export class RouteWithParams {
  /**
   *
   * @param {Route} route
   * @param {?Object} params
   */
  constructor(route, params) {
    assertType(
      route instanceof Route,
      'RouteWithParams `route` argument should be a Route'
    )
    assertType(
      isObject(params) || isNull(params),
      'RouteWithParams `params` argument should be an Object or null'
    )
    /**
     *
     * @type {Route}
     * @protected
     */
    this._route = route
    /**
     *
     * @type {?Object}
     * @protected
     */
    this._params = params
  }

  /**
   *
   * @return {Route}
   */
  get route() {
    return this._route
  }

  /**
   *
   * @return {?Object}
   */
  get params() {
    return this._params
  }
}
