import {assert, isNull} from '@flexio-oss/assert'

export class RouteConstraints {
  /**
   *
   * @param {?string} value
   * @return {?string}
   */
  static urlTemplate(value) {
    if (!isNull(value)) {
      assert(
        new RegExp(/^\//).test(value),
        'RouteConstraints:templateUrl: `value` should test `^/` : `%s` given',
        value
      )
    }
    return value
  }
}
