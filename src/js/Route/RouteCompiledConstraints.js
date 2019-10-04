import {isRegex, assertType, isNull} from '@flexio-oss/assert'

export class RouteCompiledConstraints {
  /**
   *
   * @param {?RegExp} value
   * @return {?RegExp}
   */
  static regexp(value) {
    if (!isNull(value)) {
      assertType(
        isRegex(value),
        'RouteCompiledConstraints `regexp` argument should be a regexp'
      )
    }
    return value
  }
}
