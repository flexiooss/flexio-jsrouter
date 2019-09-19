import {isFunction, isString, assertType} from '@flexio-oss/assert'

export class Route {
  /**
   *
   * @param {string} name
   * @param {string} urlTemplate : page/{myProperty}/{myOtherProperty}
   * @param {Route~clb} callback
   */
  constructor(name, urlTemplate, callback) {
    assertType(
      isString(name),
      'Route `name` argument should be a string'
    )
    assertType(
      isString(urlTemplate),
      'Route `urlTemplate` argument should be a string'
    )
    assertType(
      isFunction(callback),
      'Route `callback` argument should be a Function'
    )
    this._name = name
    this._urlTemplate = urlTemplate
    this._callback = callback
  }

  /**
   * @callback Route~clb
   * @param {RouteWithParams} routeWithParams
   */

  /**
   *
   * @return {string}
   */
  get name() {
    return this._name
  }

  /**
   *
   * @return {string}
   */
  get urlTemplate() {
    return this._urlTemplate
  }

  /**
   *
   * @param {RouteWithParams} routeWithParams
   */
  callback(routeWithParams) {
    return this._callback(routeWithParams)
  }
}
