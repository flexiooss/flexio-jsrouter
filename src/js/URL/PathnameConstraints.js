import {assert, isNull} from '@flexio-oss/assert'

export class PathnameConstraints {
  /**
   *
   * @param {?string} value
   * @return {?string}
   */
  static value(value) {
    if (!isNull(value)) {
      // assert(
      //   new RegExp('^/').test(value),
      //   'PathnameConstraints: value should be /^\//'
      // )
    }
    return value
  }
}
