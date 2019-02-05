import {isRegex, isFunction, isString, assert} from 'flexio-jshelpers'

export class Route {
  /**
   *
   * @param {string} name
   * @param {string} regexpString
   * @param {Function} callback
   */
  constructor(name, regexpString, callback) {
    assert(
      isString(name),
      'Route `name` argument should be a string'
    )
    assert(
      isString(regexpString),
      'Route `regexp` argument should be a string'
    )
    assert(
      isFunction(callback),
      'Route `callback` argument should be a Function'
    )
    this._name = name
    this._regexp = regexpString
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
  get regexp() {
    return this._regexp
  }

  /**
   *
   * @return {Function}
   */
  get callback() {
    return this._callback
  }
}
