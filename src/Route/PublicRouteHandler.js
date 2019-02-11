const __router = Symbol('__router')
const __routeConstructor = Symbol('__routeConstructor')

export class PublicRouteHandler {
  /**
   *
   * @param {Router} router
   * @param {Class<Route>} routeConstructor
   */
  constructor(router, routeConstructor) {
    this[__router] = router
    this[__routeConstructor] = routeConstructor
  }

  /**
   *
   * @param {string} name
   * @param {string} urlTemplate : page/{myProperty}/{myOtherProperty}
   * @param {Function} builder
   * @param {Function} callback
   * @return {Route}
   */
  buildRoute(name, urlTemplate, builder, callback) {
    return new this[__routeConstructor](name, urlTemplate, builder, callback)
  }

  /**
   *
   * @param {Route} route
   * @return {PublicRouteHandler}
   */
  addRoute(route) {
    this[__router].addRoute(route)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {PublicRouteHandler}
   */
  removeRoute(name) {
    this[__router].removeRoute(name)
    return this
  }

  /**
   *
   * @param {string} name
   * @param {Object} routeParameters
   * @param {?PartialUrl} partialUrl
   * @return {URL}
   */
  url(name, routeParameters, partialUrl = null) {
    return this[__router].urlByName(name, routeParameters, partialUrl)
  }
}
