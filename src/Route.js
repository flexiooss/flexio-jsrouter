import {isFunction, isString, assert} from 'flexio-jshelpers'

export class Route {
  /**
   *
   * @param {string} urlTemplate : page/{myProperty}/{myOtherProperty}
   * @param {ValueObjectBuilder} builder
   * @param {Function} callback
   */
  constructor(urlTemplate, builder, callback) {
    assert(
      isString(urlTemplate),
      'Route `urlTemplate` argument should be a string'
    )

    assert(
      isFunction(callback),
      'Route `callback` argument should be a Function'
    )
    this._urlTemplate = urlTemplate
    this._builder = builder
    this._callback = callback
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
   * @return {ValueObjectBuilder}
   */
  get builder() {
    return this._builder
  }

  /**
   *
   * @return {Function}
   */
  get callback() {
    return this._callback
  }
}
