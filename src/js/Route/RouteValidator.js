import {assert, isNull} from '@flexio-oss/assert'
import {StringValidator, ValueObjectValidator} from '@flexio-oss/js-validator-helper'

export class RouteValidator extends ValueObjectValidator {

  /**
   *
   * @param {Route} object
   * @return {boolean}
   */
  isValid(object) {
    this.__validateUrlTemplate(object)

  }

  /**
   *
   * @param {Route} object
   * @return {boolean}
   * @private
   */
  __validateUrlTemplate(object) {
    if (!isNull(object.urlTemplate())) {
      assert(
        new StringValidator().validateRegex(object.urlTemplate(), new RegExp(/^\//)),
        'RouteValidator:templateUrl: `value` should test `^/` : `%s` given',
        object.urlTemplate()
      )
      if (object.urlTemplate().length > 1) {
        assert(
          new StringValidator().validateRegex(object.urlTemplate(), new RegExp(/(?<!\/)$/)),
          'RouteValidator:templateUrl: `value` should test `/$` : `%s` given',
          object.urlTemplate()
        )
      }
    }
  }
}
