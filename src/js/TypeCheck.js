import {Router} from './Router'
import {UrlConfiguration} from './UrlConfiguration'
import {ALREADY_EXISTS, NOT_FOUND, RouteException} from './Route/RouteException'

export class TypeCheck {
  /**
   *
   * @param {*} instance
   * @return {boolean}
   */
  static isRouter(instance) {
    return instance instanceof Router
  }

  /**
   *
   * @param {*} instance
   * @return {boolean}
   */
  static isUrlConfiguration(instance) {
    return instance instanceof UrlConfiguration
  }

  /**
   *
   * @param instance
   * @return {boolean}
   */
  static isRouteException(instance) {
    return instance instanceof RouteException
  }

  /**
   *
   * @param instance
   * @return {boolean}
   */
  static isRouteExceptionNotFound(instance) {
    return TypeCheck.isRouteException(instance) && instance.code === NOT_FOUND
  }

  /**
   *
   * @param instance
   * @return {boolean}
   */
  static isRouteExceptionAlreadyExists(instance) {
    return TypeCheck.isRouteException(instance) && instance.code === ALREADY_EXISTS
  }

}
