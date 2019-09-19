import {isString, assertType} from '@flexio-oss/assert'

export class PathName {
  constructor(value = '') {
    assertType(
      isString(value),
      'js-router:PathName: `value` argument should be a string'
    )
    /**
     *
     * @type {string}
     * @private
     */
    this.__value = value
  }

  /**
   *
   * @return {string}
   */
  get value() {
    return this.__value
  }
}
