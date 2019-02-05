import {isRegex, isFunction, isString, assert} from 'flexio-jshelpers'

export class Route {
  /**
   *
   * @param {string} name
   * @param {RegExp} regexp
   * @param {Function} callback
   */
  constructor(name, regexp, callback) {
    assert(
      isString(name),
      'Route `name` argument should be a string'
    )
    assert(
      isRegex(regexp),
      'Route `regexp` argument should be a regexp'
    )
    assert(
      isFunction(callback),
      'Route `callback` argument should be a Function'
    )
    this._name = name
    this._regexp = regexp
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
   * @return {RegExp}
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
