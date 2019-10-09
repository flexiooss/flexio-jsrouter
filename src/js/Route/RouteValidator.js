import {assert} from '@flexio-oss/assert'
import {StringValidator, ValueObjectValidator} from '@flexio-oss/js-validator-helper'

export class RouteValidator extends ValueObjectValidator {

  /**
   *
   * @param {Route} object
   * @return {boolean}
   */
  isValid(object) {
    this.__validateName(object)
    this.__validateUrlTemplate(object)
  }

  /**
   *
   * @param {Route} object
   * @return {boolean}
   * @private
   */
  __validateName(object) {
    assert(
      new StringValidator().validateNotNull(object.name()),
      'RouteValidator:name: `name` should be not null'
    )
  }

  /**
   *
   * @param {Route} object
   * @return {boolean}
   * @private
   */
  __validateUrlTemplate(object) {
    assert(
      new StringValidator().validateNotNull(object.urlTemplate()),
      'RouteValidator:urlTemplate: `urlTemplate` should be not null'
    )

    assert(
      new StringValidator().validateRegex(object.urlTemplate(), new RegExp(/^\//)),
      'RouteValidator:urlTemplate: `urlTemplate` should test `^/` : `%s` given',
      object.urlTemplate()
    )

    if (object.urlTemplate().length > 1) {
      assert(
        new StringValidator().validateRegex(object.urlTemplate(), new RegExp(/(?<!\/)$/)),
        'RouteValidator:urlTemplate: `urlTemplate` should test `/$` : `%s` given',
        object.urlTemplate()
      )
    }

  }
}
