import {isRegex, assertType, isNull} from '@flexio-oss/assert'
import {ValueObjectValidator} from '@flexio-oss/js-validator-helper'

export class RouteCompiledValidator extends ValueObjectValidator {

  /**
   *
   * @param {RouteCompiled} object
   * @return {boolean}
   */
  isValid(object) {
    this.__validateRegexp(object)

  }

  /**
   *
   * @param {RouteCompiled} object
   * @return {boolean}
   * @private
   */
  __validateRegexp(object) {
    if (!isNull(object.regexp())) {
      assertType(
        isRegex(object.regexp()),
        'RouteCompiledValidator `regexp` argument should be a regexp'
      )
    }
  }
}
