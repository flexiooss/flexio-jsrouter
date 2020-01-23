import {assert} from '@flexio-oss/assert'
import {StringValidator, ValueObjectValidator} from '@flexio-oss/js-validator-helper'


export class RouteCompiledValidator extends ValueObjectValidator {

  /**
   *
   * @param {RouteCompiled} object
   * @return {boolean}
   */
  isValid(object) {
    this.__validateUrlTemplate(object)
  }

  /**
   *
   * @param {RouteCompiled} object
   * @return {boolean}
   * @private
   */
  __validateUrlTemplate(object) {
    assert(
      new StringValidator().validateNotNull(object.urlTemplate()),
      'RouteCompiledValidator:urlTemplate: `urlTemplate` should be not null'
    )

    if (object.urlTemplate().length > 1) {
      assert(
        new StringValidator().validateRegex(object.urlTemplate(), new RegExp(/^\/{1}[\w\d_{}-]+[\/\w\d_{}-]+/)),
        'RouteCompiledValidator:urlTemplate: `urlTemplate` should test `/$` : `%s` given',
        object.urlTemplate()
      )

    } else {

      assert(
        new StringValidator().validateRegex(object.urlTemplate(), new RegExp(/^\//)),
        'RouteCompiledValidator:urlTemplate: `urlTemplate` should test `^/` : `%s` given',
        object.urlTemplate()
      )
    }

    if (object.urlTemplate().length > 1) {
      assert(
        !(new StringValidator().validateRegex(object.urlTemplate(), new RegExp(/.*\/$/))),
        'RouteCompiledValidator:urlTemplate: `urlTemplate` should test `/$` : `%s` given',
        object.urlTemplate()
      )
    }

  }
}
