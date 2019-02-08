import {Router} from '../Router'
import {RouteHandler} from './RoutesHandler'

export class RouterBuilder {
  /**
   *
   * @return {Router}
   * @static
   */
  static build() {
    return new Router(new RouteHandler())
  }
}
