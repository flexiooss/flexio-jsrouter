/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {RouterBuilder} from '../RouterBuilder'
import {Route} from '../Route'
import {RouteWithParams} from '../RouteWithParams'

const assert = require('assert')

const firstRoute = new Route(
  'test',
  '^/page/([\\-_\\w]*)/?([\\d]*)?/?$',
  (params) => {
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
const otherRoute3 = new Route(
  'test3',
  '^/pages/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
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

  tearDown() {
    delete this.router
    delete this.publicRouteHandler
  }

  testAddRoute() {
    const routeWithSameName = new Route(
      'test',
      '^/page/([\\-_\\w]*)/?([\\d]*)?/?$',
      (params) => {
        console.log(params)
      }
    )

    this.publicRouteHandler.addRoute(firstRoute)

    assert.deepStrictEqual(
      this.router.route('test'),
      firstRoute,
      'should retrieve route by name'
    )

    assert.throws(() => {
      this.publicRouteHandler.addRoute(routeWithSameName)
    })
  }

  testRemoveRoute() {
    this.publicRouteHandler.addRoute(firstRoute)
    this.publicRouteHandler.removeRoute('test')

    assert.notDeepStrictEqual(
      this.router.route('test'),
      firstRoute,
      'should not be retrieve removed route by name'
    )
  }

  testInvokeCallback() {
    let martyr1 = false

    const routeWithCallback = new Route(
      'testMartyr1',
      '^/martyr/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$',
      (params) => {
        martyr1 = true
        console.log(params)
      }
    )

    this.publicRouteHandler
      .addRoute(firstRoute)
      .addRoute(otherRoute)
      .addRoute(routeWithCallback)
      .addRoute(otherRoute3)

    const routeUrl = '/martyr/bibi/5'
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
