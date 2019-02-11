/**
 *
 * @interface
 */
export class RouteHandlerInterface {
  /**
   *
   * @param {Route} route
   * @return {RouteHandler}
   */
  addRoute(route) {
  }

  /**
   *
   * @param {string} name
   * @return {RouteHandler}
   */
  removeRoute(name) {
  }

  /**
   *
   * @param {string} name
   * @return {boolean}
   */
  hasRoute(name) {
  }

  /**
   *
   * @param {string} name
   * @return {Route}
   */
  route(name) {
  }

  /**
   *
   * @param {string} url
   * @return {RouteWithParams}
   * @throws {RouteNotFoundException}
   */
  routeByUrl(url) {
  }
}
