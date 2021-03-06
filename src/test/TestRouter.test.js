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
export class TestRouterTest extends TestCase {
  setUp() {
    this.router = RouterBuilder.build(
      RouterBuilder.urlConfigurationBuilder()
        .port('8080')
        .protocol('https')
        .hostname('localhost')
        .build()
    )

    this.firstRoute = this.router
      .routeBuilder()
      .name('firstRoute')
      .urlTemplate('/firstRoute/{pageName}/{pageId}')
      .build()

    this.otherRoute = this.router
      .routeBuilder()
      .name('otherRoute')
      .urlTemplate('/otherRoute/{pageName}/{pageId}')
      .build()

    this.yetAnOtherRoute = this.router
      .routeBuilder()
      .name('yetAnOtherRoute')
      .urlTemplate('/yetAnOtherRoute/{pageName}/{pageId}')
      .build()

    this.rootRoute = this.router
      .routeBuilder()
      .name('rootRoute')
      .urlTemplate('/')
      .build()

    this.resource = this.router
      .routeBuilder()
      .name('resource')
      .urlTemplate('/resource')
      .build()

  }

  testAddRoute() {
    const routeWithSameName = this.router.routeBuilder()
      .name('firstRoute')
      .urlTemplate('/routeWithSameName/{pageName}/{pageId}')
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

    assert.throws(() => {
      this.router.addRoute(this.router.routeBuilder()
        .name('firstRoute')
        .urlTemplate('routeWithoutSlash/{pageName}/{pageId}')
        .build())
    })
  }

  testAddSubRoute() {

    const root = this.router.addRoute(this.rootRoute)
    const resource = root.addRoute(this.resource)

    const subroute1 = resource.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute')
        .urlTemplate('/{id}')
        .build()
    )

    assert.deepStrictEqual(
      this.router.route('resource.subRoute'),
      this.router
        .routeBuilder()
        .name('resource.subRoute')
        .urlTemplate('/{id}')
        .parent('resource')
        .build(),
      'should retrieve route by name'
    )

    assert.throws(() => {
      this.router.addRoute(this.router
        .routeBuilder()
        .name('resource.subRoute')
        .urlTemplate('/{id}')
        .parent('resource')
        .build())
    })

    subroute1.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute.element')
        .urlTemplate('/element/{elementId}')
        .build()
    )

    assert.deepStrictEqual(
      this.router.route('resource.subRoute.element'),
      this.router
        .routeBuilder()
        .name('resource.subRoute.element')
        .urlTemplate('/element/{elementId}')
        .parent('resource.subRoute')
        .build(),
      'should retrieve route by name'
    )

  }

  testRemoveRoute() {
    this.router.addRoute(this.firstRoute)
    this.router.removeRoute('firstRoute')

    assert.throws(() => {
      this.router.route('firstRoute')
    })
  }

  testRemoveSubRoute() {
    const root = this.router.addRoute(this.rootRoute)
    const resource = root.addRoute(this.resource)

    resource.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute')
        .urlTemplate('/{id}')
        .build()
    )

    this.router.removeRoute('resource.subRoute')

    assert.throws(() => {
      this.router.route('resource.subRoute')
    })
  }

  testUrlByName() {

    this.router.addRoute(this.firstRoute)
    this.router.addRoute(this.otherRoute)
    this.router.addRoute(this.yetAnOtherRoute)
    this.router.addRoute(this.rootRoute)

    const url1 = this.router.urlByRouteName('firstRoute', {pageName: 'bibi', pageId: '5'})

    const expectedUrl1 = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/firstRoute/bibi/5')
      .build()

    assert.deepStrictEqual(url1, expectedUrl1, 'should retrieve Url from name with params')

    const url2 = this.router.urlByRouteName('rootRoute')

    const expectedUrl2 = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/')
      .build()

    assert.deepStrictEqual(url2, expectedUrl2, '2:should retrieve Url from name with params')
  }

  testSubUrlByName() {

    const root = this.router.addRoute(this.rootRoute)
    const resource = root.addRoute(this.resource)

    const subroute1 = resource.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute')
        .urlTemplate('/{id}')
        .build()
    )

    const url1 = this.router.urlByRouteName('resource.subRoute', {id: '5'})

    const expectedUrl1 = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/resource/5')
      .build()

    assert.deepStrictEqual(url1, expectedUrl1, '1 : should retrieve subUrl from name with params')

    subroute1.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute.element')
        .urlTemplate('/element/{elementId}')
        .build()
    )

    const url2 = this.router.urlByRouteName('resource.subRoute.element', {id: '5', elementId: '12'})

    const expectedUrl2 = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/resource/5/element/12')
      .build()

    assert.deepStrictEqual(url2, expectedUrl2, '2 : should retrieve subUrl from name with params')

  }

  testRouteByUrl() {

    this.router.addRoute(this.firstRoute)
    this.router.addRoute(this.otherRoute)
    this.router.addRoute(this.yetAnOtherRoute)
    this.router.addRoute(this.rootRoute)

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/firstRoute/bibi/5')
          .build()
      )
        .route(),
      this.firstRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/firstRoute/bibi/5/')
          .build()
      )
        .route(),
      this.firstRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/firstRoute/bibi/5?toto=abc&truc=bof#42')
          .build()
      )
        .route(),
      this.firstRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/firstRoute/bibi/5/?toto=abc&truc=bof#42')
          .build()
      )
        .route(),
      this.firstRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080')
          .build()
      )
        .route(),
      this.rootRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/')
          .build()
      )
        .route(),
      this.rootRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080?toto=abc&truc=bof#42')
          .build()
      )
        .route(),
      this.rootRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/?toto=abc&truc=bof#42')
          .build()
      )
        .route(),
      this.rootRoute
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
          .fromURL(new URLExtended('/', 'https://localhost:8080'))
          .build()
      )
        .route(),
      this.rootRoute
    )

    const testUrl4 = globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('/', 'https://localhost:8080'))
      .build()
    const routeWithParams4 = this.router.routeByUrl(testUrl4)

    console.log(globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('/', 'https://localhost:8080'))
      .build())
    console.log(globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('/', 'https://localhost:8080'))
      .build())

  }

  testSubRouteByUrl() {

    const root = this.router.addRoute(this.rootRoute)
    const resource = root.addRoute(this.resource)

    const subroute1 = resource.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute')
        .urlTemplate('/{id}')
        .build()
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/resource/5')
          .build()
      )
        .route(),
      this.router.route('resource.subRoute')
    )

    subroute1.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute.element')
        .urlTemplate('/element/{elementId}')
        .build()
    )

    assert.deepStrictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/resource/5/element/12')
          .build()
      )
        .route(),
      this.router.route('resource.subRoute.element')
    )
  }

  testParams() {
    this.router.addRoute(this.firstRoute)
    this.router.addRoute(this.otherRoute)
    this.router.addRoute(this.yetAnOtherRoute)
    this.router.addRoute(this.rootRoute)

    const routePathname1 = 'firstRoute/bibi/5'

    const testUrl = new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
      .value('https://localhost:8080/' + routePathname1)
      .build()

    const routeWithParams1 = this.router.routeByUrl(testUrl)

    assert.strictEqual(routeWithParams1.params().stringValue('pageName'), 'bibi')
    assert.strictEqual(routeWithParams1.params().stringValue('pageId'), '5')
    const testUrl2 = globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('firstRoute/bibi/5?toto=abc&truc=bof#42', 'https://localhost:8080'))
      .build()

    const routeWithParams2 = this.router.routeByUrl(testUrl2)

    assert.strictEqual(routeWithParams2.params().stringValue('pageName'), 'bibi')
    assert.strictEqual(routeWithParams2.params().stringValue('pageId'), '5')

    const routeWithParams3 = this.router.routeByUrl(testUrl)

    assert.strictEqual(routeWithParams3.params().stringValue('pageName'), 'bibi')
    assert.strictEqual(routeWithParams3.params().stringValue('pageId'), '5')

    const testUrl4 = globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('/', 'https://localhost:8080'))
      .build()

    const routeWithParams4 = this.router.routeByUrl(testUrl4)

    assert.strictEqual(routeWithParams4.params().size(), 0)
  }

  testSubRouteParam() {

    const root = this.router.addRoute(this.rootRoute)
    const resource = root.addRoute(this.resource)

    const subroute1 = resource.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute')
        .urlTemplate('/{id}')
        .build()
    )

    assert.strictEqual(
      this.router.routeByUrl(
        new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
          .value('https://localhost:8080/resource/5')
          .build()
      )
        .params()
        .stringValue('id'),
      '5'
    )
    subroute1.addRoute(
      this.router
        .routeBuilder()
        .name('resource.subRoute.element')
        .urlTemplate('/element/{elementId}')
        .build()
    )

    const params = this.router.routeByUrl(
      new globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder()
        .value('https://localhost:8080/resource/5/element/12')
        .build()
    ).params()
    assert.strictEqual(params.stringValue('id'), '5')
    assert.strictEqual(params.stringValue('elementId'), '12')
  }

  testNotFound() {
    this.router.addRoute(this.firstRoute)
    this.router.addRoute(this.otherRoute)

    const otherRouteUrlFalse = globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
      .fromURL(new URLExtended('book/bobo/7/', 'https://localhost:8080'))
      .build()

    assert.throws(() => {
      const routeWithParams = this.router.routeByUrl(otherRouteUrlFalse)
    })
  }
}

runTest(TestRouterTest)
