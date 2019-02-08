/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {RouterBuilder} from '../Route/RouterBuilder'
import {Route} from '../Route/Route'
import {RouteWithParams} from '../Route/RouteWithParams'

const assert = require('assert')
/**
 *
 * @param {Object} obj
 * @return {Object}
 */
const builder = obj => Object.assign({}, obj)

const firstRoute = new Route(
  'firstRoute',
  'firstRoute/{pageName}/{pageId}',
  builder,
  (params) => {
    console.log(params)
  }
)

const otherRoute = new Route(
  'otherRoute',
  'otherRoute/{pageName}/{pageId}',
  builder,
  (params) => {
    console.log(params)
  }
)

const yetAnOtherRoute = new Route(
  'yetAnOtherRoute',
  'yetAnOtherRoute/{pageName}/{pageId}',
  builder,
  (params) => {
    console.log(params)
  }
)

/**
 * @extends TestCase
 */
export class TestRouter extends TestCase {
  setUp() {
    this.router = RouterBuilder.build()
    this.publicRouteHandler = this.router.routeHandler()
  }

  testAddRoute() {
    const routeWithSameName = this.publicRouteHandler.buildRoute(
      'firstRoute',
      'routeWithSameName/{pageName}/{pageId}',
      builder,
      (params) => {
        console.log(params)
      }
    )

    this.publicRouteHandler.addRoute(firstRoute)

    assert.deepStrictEqual(
      this.router.route('firstRoute'),
      firstRoute,
      'should retrieve route by name'
    )

    assert.throws(() => {
      this.publicRouteHandler.addRoute(routeWithSameName)
    })
  }

  testRemoveRoute() {
    this.publicRouteHandler.addRoute(firstRoute)
    this.publicRouteHandler.removeRoute('firstRoute')

    assert.throws(() => {
      this.router.route('firstRoute')
    })
  }

  testInvokeCallback() {
    let martyr1 = false

    const routeWithCallback = new Route(
      'routeWithCallback',
      'routeWithCallback/{pageName}/{pageId}',
      builder,
      (params) => {
        martyr1 = true
        console.log(params)
      }
    )

    this.publicRouteHandler
      .addRoute(firstRoute)
      .addRoute(otherRoute)
      .addRoute(routeWithCallback)
      .addRoute(yetAnOtherRoute)

    const routeUrl = 'routeWithCallback/bibi/5'
    const routeWithParams = this.router.routeByUrl(routeUrl)

    routeWithParams.route.callback(routeWithParams.params)

    assert.ok(martyr1, 'route test callback should be invoked')
  }

  testNotFound() {
    this.publicRouteHandler
      .addRoute(firstRoute)
      .addRoute(otherRoute)

    const otherRouteUrlFalse = 'book/bobo/7/'

    assert.throws(() => {
      const routeWithParams = this.router.routeByUrl(otherRouteUrlFalse)
    })
  }
}

runTest(TestRouter)
