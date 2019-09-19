import {isRegex, assertType} from '@flexio-oss/assert'
import {Route} from './Route'

export class RouteCompiled {
  /**
   *
   * @param {Route} route
   * @param {RegExp} regexp
   */
  constructor(route, regexp) {
    assertType(
      route instanceof Route,
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
  get route() {
    return this.__route
  }

  /**
   *
   * @return {RegExp}
   */
  get regexp() {
    return this.__regexp
  }
}
