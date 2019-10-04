/* global runTest */
import '../../generated/io/package'
import {URLExtended} from '@flexio-oss/extended-flex-types'
import {TestCase} from 'code-altimeter-js'
import {RouterBuilder} from '../js/RouterBuilder'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

const assert = require('assert')

/**
 * @extends TestCase
 */
export class TestRouterWithPathname extends TestCase {
  setUp() {

    this.router = RouterBuilder.build(
      RouterBuilder.urlConfigurationBuilder()
        .port('8080')
        .protocol('https')
        .hostname('localhost')
        .pathname('/pathname')
        .build()
    )

    this.firstRoute = this.router
      .routeBuilder()
      .name('firstRoute')
      .urlTemplate('firstRoute/{pageName}/{pageId}')
      .build()

    this.otherRoute = this.router
      .routeBuilder()
      .name('otherRoute')
      .urlTemplate('otherRoute/{pageName}/{pageId}')
      .build()

    this.yetAnOtherRoute = this.router
      .routeBuilder()
      .name('yetAnOtherRoute')
      .urlTemplate('yetAnOtherRoute/{pageName}/{pageId}')
      .build()

  }

  testAddRoute() {
    const routeWithSameName = this.router.routeBuilder()
      .name('firstRoute')
      .urlTemplate('routeWithSameName/{pageName}/{pageId}')
      .build()

    this.router.addRoute(this.firstRoute)

    assert.deepStrictEqual(
      this.router.route('firstRoute'),
      this.firstRoute,
      'should retrieve route by name'
    )

    assert.throws(() => {
      this.router.addRoute(routeWithSameName)
    })
  }

  testRemoveRoute() {
    this.router.addRoute(this.firstRoute)
    this.router.removeRoute('firstRoute')

    assert.throws(() => {
      this.router.route('firstRoute')
    })
  }

  testUrlByName() {

    this.router
      .addRoute(this.firstRoute)
      .addRoute(this.otherRoute)
      .addRoute(this.yetAnOtherRoute)

    const url = this.router.urlByRouteName('firstRoute', {pageName: 'bibi', pageId: 5})

    const expectedUrl = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/pathname/firstRoute/bibi/5')
      .build()

    assert.deepStrictEqual(url, expectedUrl, 'should retrieve Url from name with params')
  }

  testParams() {

    this.router
      .addRoute(this.firstRoute)
      .addRoute(this.otherRoute)
      .addRoute(this.yetAnOtherRoute)

    const routePathname1 = 'firstRoute/bibi/5'

    const testUrl = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/pathname/' + routePathname1)
      .build()

    const routeWithParams1 = this.router.routeByUrl(testUrl)

    assert.deepStrictEqual(routeWithParams1.params(),
      {pageName: 'bibi', pageId: '5'}
    )

    const testUrl2 = globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('pathname/firstRoute/bibi/5?toto=abc&truc=bof#42', 'https://localhost:8080'))
      .build()

    const routeWithParams2 = this.router.routeByUrl(testUrl2)

    assert.deepStrictEqual(routeWithParams2.params(),
      {pageName: 'bibi', pageId: '5'}
    )

    const routeWithParams3 = this.router.routeByUrl(testUrl)

    assert.deepStrictEqual(routeWithParams3.params(),
      {pageName: 'bibi', pageId: '5'}
    )

  }

  testNotFound() {
    this.router
      .addRoute(this.firstRoute)
      .addRoute(this.otherRoute)

    const otherRouteUrlFalse = globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('pathname/book/bobo/7/', 'https://localhost:8080'))
      .build()

    assert.throws(() => {
      const routeWithParams = this.router.routeByUrl(otherRouteUrlFalse)
    })
  }
}

runTest(TestRouterWithPathname)
