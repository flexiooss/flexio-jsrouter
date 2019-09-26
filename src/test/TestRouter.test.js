/* global runTest */
import {URLExtended, FlexUrlBuilder} from '@flexio-oss/extended-flex-types'
import {TestCase} from 'code-altimeter-js'
import {RouterBuilder} from '../js/RouterBuilder'
import {Route} from '../js/Route/Route'
import {UrlConfiguration} from '../js/UrlConfiguration'
import {Pathname} from '../js/URL/Pathname'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {FlexUrl} from '../../../extended-flex-types'

const assert = require('assert')

const firstRoute = Route.build(
  'firstRoute',
  'firstRoute/{pageName}/{pageId}'
)

const otherRoute = Route.build(
  'otherRoute',
  'otherRoute/{pageName}/{pageId}'
)

const yetAnOtherRoute = Route.build(
  'yetAnOtherRoute',
  'yetAnOtherRoute/{pageName}/{pageId}'
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
  }

  testAddRoute() {
    const routeWithSameName = this.router.routeBuilder().build(
      'firstRoute',
      'routeWithSameName/{pageName}/{pageId}'
    )

    this.router.addRoute(firstRoute)

    assert.deepStrictEqual(
      this.router.route('firstRoute'),
      firstRoute,
      'should retrieve route by name'
    )

    assert.throws(() => {
      this.router.addRoute(routeWithSameName)
    })
  }

  testRemoveRoute() {
    this.router.addRoute(firstRoute)
    this.router.removeRoute('firstRoute')

    assert.throws(() => {
      this.router.route('firstRoute')
    })
  }

  testUrlByName() {

    this.router
      .addRoute(firstRoute)
      .addRoute(otherRoute)
      .addRoute(yetAnOtherRoute)

    const url = this.router.urlByRouteName('firstRoute', {pageName: 'bibi', pageId: 5})

    const expectedUrl = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/firstRoute/bibi/5')
      .build()

    assert.deepStrictEqual(url, expectedUrl, 'should retrieve Url from name with params')
  }

  testParams() {

    this.router
      .addRoute(firstRoute)
      .addRoute(otherRoute)
      .addRoute(yetAnOtherRoute)

    const routePathname1 = 'firstRoute/bibi/5'

    const testUrl =  new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/' + routePathname1)
      .build()


    const routeWithParams1 = this.router.routeByUrl(testUrl)

    assert.deepStrictEqual(routeWithParams1.params,
      {pageName: 'bibi', pageId: '5'}
    )

    const testUrl2 =   globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('firstRoute/bibi/5?toto=abc&truc=bof#42', 'https://localhost:8080'))
      .build()

    const routeWithParams2 = this.router.routeByUrl(testUrl2)

    assert.deepStrictEqual(routeWithParams2.params,
      {pageName: 'bibi', pageId: '5'}
    )
  }

  testNotFound() {
    this.router
      .addRoute(firstRoute)
      .addRoute(otherRoute)

    const otherRouteUrlFalse = new Pathname('book/bobo/7/')

    assert.throws(() => {
      const routeWithParams = this.router.routeByPathname(otherRouteUrlFalse)
    })
  }
}

runTest(TestRouterTest)
