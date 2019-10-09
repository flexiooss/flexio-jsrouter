/**
 * @interface
 */
export class RoutesHandler {
  /**
   *
   * @param {Route} route
   * @return {PublicRouteHandler}
   */
  addRoute(route) {
   throw new Error('should be override')
  }

  /**
   *
   * @param {string} name
   * @return {this}
   */
  removeRoute(name) {
    throw new Error('should be override')

  }

  /**
   *
   * @param {string} name
   * @return {Route}
   */
  route(name) {
    throw new Error('should be override')
  }
}
