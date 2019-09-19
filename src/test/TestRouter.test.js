/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {RouterBuilder} from '../js/RouterBuilder'
import {Route} from '../js/Route/Route'
import {PublicRouteHandler} from '../js/Route/PublicRouteHandler'
import {UrlConfiguration} from '../js/UrlConfiguration'
import {PathName} from '../js/URL/PathName'
import {URLExtended} from '@flexio-oss/extended-flex-types'

const assert = require('assert')

const firstRoute = new Route(
  'firstRoute',
  'firstRoute/{pageName}/{pageId}',
  (params) => {
    console.log(params)
  }
)

const otherRoute = new Route(
  'otherRoute',
  'otherRoute/{pageName}/{pageId}',
  (params) => {
    console.log(params)
  }
)

const yetAnOtherRoute = new Route(
  'yetAnOtherRoute',
  'yetAnOtherRoute/{pageName}/{pageId}',
  (params) => {
    console.log(params)
  }
)

/**
 * @extends TestCase
 */
export class TestRouterTest extends TestCase {
  setUp() {
    this.router = RouterBuilder.build(new UrlConfiguration(
      'https',
      'localhost',
      '8080')
    )
    this.publicRouteHandler = new PublicRouteHandler(this.router, Route)
  }

  testAddRoute() {
    const routeWithSameName = this.publicRouteHandler.buildRoute(
      'firstRoute',
      'routeWithSameName/{pageName}/{pageId}',
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

  testUrlByName() {
    this.publicRouteHandler
      .addRoute(firstRoute)
      .addRoute(otherRoute)
      .addRoute(yetAnOtherRoute)

    const url = this.publicRouteHandler.url('firstRoute', {pageName: 'bibi', pageId: 5})
    const expectedUrl = new URLExtended('firstRoute/bibi/5', 'https://localhost:8080')

    assert.deepStrictEqual(url, expectedUrl, 'should retrieve Url from name with params')
  }

  testBuilder() {
    this.publicRouteHandler
      .addRoute(firstRoute)
      .addRoute(otherRoute)
      .addRoute(yetAnOtherRoute)

    const routePathname = new PathName('firstRoute/bibi/5')
    const routeWithParams = this.router.routeByPathname(routePathname)

    assert.notDeepStrictEqual(routeWithParams.params,
      {pageName: 'bibi', pageId: '5'},
      'route params prototype should be null'
    )
      }

  testInvokeCallback() {
    let martyr1 = false

    const routeWithCallback = new Route(
      'routeWithCallback',
      'routeWithCallback/{pageName}/{pageId}',
      (params) => {
        martyr1 = true
        console.log('testInvokeCallback payload : ')
        console.log(params)
      }
    )

    this.publicRouteHandler
      .addRoute(firstRoute)
      .addRoute(otherRoute)
      .addRoute(routeWithCallback)
      .addRoute(yetAnOtherRoute)

    const routePathname = new PathName('routeWithCallback/bibi/5')

    const routeWithParams = this.router.routeByPathname(routePathname)

    routeWithParams.route.callback(
      routeWithParams
    )

    assert.ok(martyr1, 'route test callback should be invoked')
  }

  testNotFound() {
    this.publicRouteHandler
      .addRoute(firstRoute)
      .addRoute(otherRoute)

    const otherRouteUrlFalse = new PathName('book/bobo/7/')

    assert.throws(() => {
      const routeWithParams = this.router.routeByPathname(otherRouteUrlFalse)
    })
  }
}

// runTest(TestRouterTest)
