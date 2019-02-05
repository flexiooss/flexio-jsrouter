const __router = Symbol('__router')

export class PublicRoutesHandler {
  /**
   *
   * @param {Router} router
   */
  constructor(router) {
    this[__router] = router
  }

  /**
   *
   * @param {Route} route
   * @return {PublicRoutesHandler}
   */
  addRoute(route) {
    this[__router].addRoute(route)
    return this
  }

  /**
   *
   * @param {string} name
   * @return {PublicRoutesHandler}
   */
  removeRoute(name) {
    this[__router].removeRoute(name)
    return this
  }
}
