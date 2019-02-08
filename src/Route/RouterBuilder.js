import {Router} from '../Router'
import {RouteHandler} from './RouteHandler'

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
