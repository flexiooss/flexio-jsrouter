import {isFunction, isString, assertType} from '@flexio-oss/assert'

export class Route {
  /**
   *
   * @param {string} name
   * @param {string} urlTemplate - page/{myProperty}/{myOtherProperty}
   * @private
   */
  constructor(name, urlTemplate) {
    assertType(
      isString(name),
      'Route `name` argument should be a string'
    )
    assertType(
      isString(urlTemplate),
      'Route `urlTemplate` argument should be a string'
    )

    /**
     *
     * @type {string}
     * @protected
     */
    this._name = name
    /**
     *
     * @type {string}
     * @protected
     */
    this._urlTemplate = urlTemplate

  }

  /**
   *
   * @param {string} name
   * @param {string} urlTemplate - page/{myProperty}/{myOtherProperty}
   * @return {Route}
   * @static
   */
  static build(name, urlTemplate) {
    return new Route(name, urlTemplate)
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
}
