import {assert, isNull} from '@flexio-oss/assert'
import {StringValidator, ValueObjectValidator} from '@flexio-oss/js-validator-helper'

export class PathnameValidator extends ValueObjectValidator {

  /**
   *
   * @param { Pathname} object
   * @return {boolean}
   */
  isValid(object) {
    this.__validateValue(object)
  }

  /**
   *
   * @param { Pathname} object
   * @private
   */
  __validateValue(object) {
    if (!isNull(object.value())) {
      assert(
        new StringValidator().validateRegex(object.value(), new RegExp(/^\//)),
        'PathnameValidator: `value` should test `^/` : `%s` given',
        object.value()
      )
    }
  }
}
