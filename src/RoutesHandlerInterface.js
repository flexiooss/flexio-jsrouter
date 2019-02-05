/**
 *
 * @interface
 */
export class RoutesHandlerInterface {
  /**
   *
   * @param {Route} route
   * @return {RoutesHandler}
   */
  addRoute(route) {
  }

  /**
   *
   * @param {string} name
   * @return {RoutesHandler}
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
   * @param {RoutesHandler~MapCallback} callback
   */
  forEachRoutes(callback) {
  }

  /**
   * @callback RoutesHandler~MapCallback
   * @param {Route} route
   * @param {string} nameL
   * @param {Map<string, Route>} routes
   */
}
