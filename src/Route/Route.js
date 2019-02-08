import {isFunction, isString, assert} from 'flexio-jshelpers'

export class Route {
  /**
   *
   * @param {string} name
   * @param {string} urlTemplate : page/{myProperty}/{myOtherProperty}
   * @param {Function} builder
   * @param {Function} callback
   */
  constructor(name, urlTemplate, builder, callback) {
    assert(
      isString(name),
      'Route `name` argument should be a string'
    )
    assert(
      isString(urlTemplate),
      'Route `urlTemplate` argument should be a string'
    )

    assert(
      isFunction(builder),
      'Route `builder` argument should be a Function'
    )
    assert(
      isFunction(callback),
      'Route `callback` argument should be a Function'
    )
    this._name = name
    this._urlTemplate = urlTemplate
    this._builder = builder
    this._callback = callback
  }

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
   * @return {Function}
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
