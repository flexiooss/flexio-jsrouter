import {isRegex, assert} from 'flexio-jshelpers'
import {Route} from './Route'

export class RouteCompiled {
  /**
   *
   * @param {Route} route
   * @param {RegExp} regexp
   */
  constructor(route, regexp) {
    assert(
      route instanceof Route,
      'RouteCompiled `route` argument should be an instance of Route'
    )
    assert(
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
