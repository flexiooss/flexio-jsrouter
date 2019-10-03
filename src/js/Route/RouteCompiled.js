import {isRegex, assertType} from '@flexio-oss/assert'
import {TypeCheck} from '../TypeCheck'

export class RouteCompiled {
  /**
   *
   * @param {Route} route
   * @param {RegExp} regexp
   */
  constructor(route, regexp) {
    assertType(
      TypeCheck.isRoute(route),
      'RouteCompiled `route` argument should be an instance of Route'
    )
    assertType(
      isRegex(regexp),
      'RouteCompiled `regexp` argument should be a regexp'
    )
    /**
     *
     * @type {Route}
     * @private
     */
    this.__route = route
    /**
     *
     * @type {RegExp}
     * @private
     */
    this.__regexp = regexp
  }

  /**
   *
   * @return {Route}
   */
  route() {
    return this.__route
  }

  /**
   *
   * @return {RegExp}
   */
  regexp() {
    return this.__regexp
  }
}
