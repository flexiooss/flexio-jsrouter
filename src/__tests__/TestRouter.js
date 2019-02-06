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
    this.publicRouteHandler = this.router.routeHandler()
  }

  tearDown() {
    delete this.router
    delete this.publicRouteHandler
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

    this.publicRouteHandler.addRoute(route)

    assert.deepStrictEqual(
      this.router.route('test'),
      route,
      'should retrieve route by name'
    )

    assert.throws(() => {
      this.publicRouteHandler.addRoute(routeWithSameName)
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
    this.publicRouteHandler.addRoute(route)
    this.publicRouteHandler.removeRoute('test')

    assert.notDeepStrictEqual(
      this.router.route('test'),
      route,
      'should not be retrieve removed Lroute by name'
    )
  }

  testInvokeCallback() {
    let martyr1 = false
    const route = new Route(
      'test',
      '^/page/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        martyr1 = true
        console.log('params')
        console.log(params)
      }
    )
    const otherRouteUrlFalse = 'pages/bobo/7/'
    const otherRoute = new Route(
      'test2',
      '^/pages/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        console.log(params)
      }
    )
    const otherRoute3 = new Route(
      'test3',
      '^/pages/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        console.log(params)
      }
    )

    this.publicRouteHandler
      .addRoute(route)
      .addRoute(otherRoute)
      .addRoute(otherRoute3)

    const routeUrl = '/page/bibi/5'
    this.router.callBackRoute(routeUrl)

    assert.ok(martyr1, 'route test callback should be invoked')
  }

  testNotFound() {
    const route = new Route(
      'test',
      '^/page/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        console.log('params')
        console.log(params)
      }
    )

    const otherRoute = new Route(
      'test2',
      '^/pages/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        console.log(params)
      }
    )

    this.publicRouteHandler
      .addRoute(route)
      .addRoute(otherRoute)

    const otherRouteUrlFalse = 'book/bobo/7/'

    assert.throws(() => {
      this.router.callBackRoute(otherRouteUrlFalse)
    })
  }
}

runTest(TestRouter)
