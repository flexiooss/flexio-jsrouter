/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {RouterBuilder} from '../RouterBuilder'
import {Route} from '../Route'

const assert = require('assert')

/**
 * @extends TestCase
 */
export class TestRouter extends TestCase {
  setUp() {
    this.router = RouterBuilder.build()
    this.routeHandler = this.router.routeHandler()
  }

  tearDown() {
    delete this.router
    delete this.routeHandler
  }

  testAddRoute() {
    const route = new Route(
      'test',
      '^/page/([\\-_\\w]*)/?([\\d]*)?/?$',
      (params) => {
        console.log(params)
      }
    )
    const routeWithSameName = new Route(
      'test',
      '^/page/([\\-_\\w]*)/?([\\d]*)?/?$',
      (params) => {
        console.log(params)
      }
    )

    this.routeHandler.addRoute(route)

    assert.deepStrictEqual(
      this.router.route('test'),
      route,
      'should retrieve route by name'
    )

    assert.throws(() => {
      this.routeHandler.addRoute(routeWithSameName)
    })
  }

  testRemoveRoute() {
    const route = new Route(
      'test',
      '^/page/([\\-_\\w]*)/?([\\d]*)?/?$',
      (params) => {
        console.log(params)
      }
    )
    this.routeHandler.addRoute(route)
    this.routeHandler.removeRoute('test')

    assert.notDeepStrictEqual(
      this.router.route('test'),
      route,
      'should not be retrieve removed Lroute by name'
    )
  }

  testInvokeCallback() {
    let martyr1 = false
    let martyr2 = false
    const routeUrl = '/page/bibi/5'
    const route = new Route(
      'test',
      '^/page/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        martyr1 = true
        console.log('params')
        console.log(params)
      }
    )
    const otherRouteUrl = '/pages/bobo/7/'
    const otherRouteUrlFalse = 'pages/bobo/7/'
    const otherRoute = new Route(
      'test2',
      '^/pages/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        martyr2 = true
        console.log(params)
      }
    )

    this.routeHandler
      .addRoute(route)
      .addRoute(otherRoute)

    this.router.findRouteInvoke(routeUrl)
    martyr1 = false
    this.router.findRouteInvoke(routeUrl)
    this.router.findRouteInvoke(otherRouteUrlFalse)

    assert(!martyr2, 'route test2 callback should not be invoked')

    assert.ok(martyr1, 'route test callback should be invoked')
  }
}

runTest(new TestRouter())
