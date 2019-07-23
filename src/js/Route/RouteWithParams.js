import {isObject, assert, isNull} from '@flexio-oss/assert'
import {Route} from './Route'

export class RouteWithParams {
  /**
   *
   * @param {Route} route
   * @param {?Object} params
   */
  constructor(route, params) {
    assert(
      route instanceof Route,
      'Route `name` argument should be a string'
    )
    assert(
      isObject(params) || isNull(params),
      'Route `regexp` argument should be a string'
    )
    this._route = route
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
