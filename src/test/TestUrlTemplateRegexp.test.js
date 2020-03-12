/* global runTest */
import '../../generated/io/package'
import {TestCase} from 'code-altimeter-js'
import {UrlTemplateRegexp} from '../js/TemplateUrl/UrlTemplateRegexp'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'


const assert = require('assert')


/**
 * @extends TestCase
 */
export class TestUrlTemplateRegexpTest extends TestCase {
  testTemplateToRegexp() {
    const urlTemplate = 'page/{category}/{pageId}'
    const flexRe = UrlTemplateRegexp.flexRegexpFromUrlTemplate(urlTemplate)
    const re = flexRe.value()
    const url = 'page/bobo/7/'

    const matches = re.exec(url)

    assert.deepStrictEqual(
      ['category', 'pageId'],
      flexRe.namedGroups().toArray(),
      'should have ordered params'
    )

    assert.strictEqual(
      matches[1],
      'bobo',
      'should retrieve first Pathname parameters'
    )
    assert.strictEqual(
      matches[2],
      '7',
      'should retrieve 2nd Pathname parameters'
    )
  }

  testTemplateToPathname() {
    const urlTemplate = '/page/{category}/{pageId}'
    //TODO: route compiled
    const pathname = UrlTemplateRegexp.pathnameFromUrlTemplate(
      new globalFlexioImport.io.flexio.js_router.types
        .RouteCompiledBuilder()
        .urlTemplate(urlTemplate)
        .regexp(
          new globalFlexioImport.io.flexio.extended_flex_types.FlexRegExpBuilder().namedGroups(
            new globalFlexioImport.io.flexio.flex_types.arrays.StringArray('category', 'pageId')
          ).build()
        )
        .build(),
      globalFlexioImport.io.flexio.flex_types
        .ObjectValueBuilder
        .fromObject({
          category: 'bobo',
          pageId: '7'
        }).build())
    console.log(pathname)

    const expectedPathname = new globalFlexioImport.io.flexio.js_router.types
      .PathnameBuilder()
      .value('/page/bobo/7')
      .build()

    assert.deepStrictEqual(
      pathname,
      expectedPathname,
      'should retrieve Pathname with parameters'
    )
  }
}


runTest(TestUrlTemplateRegexpTest)
