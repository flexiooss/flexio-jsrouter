import {Router} from './Router'
import {RoutesHandler} from './RoutesHandler'

export class RouterBuilder {
  /**
   *
   * @return {Router}
   * @static
   */
  static build() {
    return new Router(new RoutesHandler())
  }
}
