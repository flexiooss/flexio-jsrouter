import {Router} from './Router'
import {UrlConfiguration} from './UrlConfiguration'
import {ALREADY_EXISTS, NOT_FOUND, RouteException} from './Route/RouteException'
import {RouteHandler} from './Route/RouteHandler'
import {globalFlexioImport} from '../../../global-import-registry'

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

  /**
   *
   * @param {*} instance
   * @return {boolean}
   */
  static isRouteHandler(instance) {
    return instance instanceof RouteHandler
  }

  /**
   *
   * @param {*} instance
   * @return {boolean}
   */
  static isRoute(instance) {
    return instance instanceof globalFlexioImport.io.flexio.js_router.types.Route
  }

  /**
   *
   * @param {*} instance
   * @return {boolean}
   */
  static isRouteWithParams(instance) {
    return instance instanceof globalFlexioImport.io.flexio.js_router.types.RouteWithParams
  }

}
