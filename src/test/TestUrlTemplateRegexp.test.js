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
    const re = UrlTemplateRegexp.regexpFromUrlTemplate(urlTemplate)
    const url = 'page/bobo/7/'
    const matches = re.exec(url)

    assert.strictEqual(
      matches.groups.category,
      'bobo',
      'should retrieve first Pathname parameters'
    )
    assert.strictEqual(
      matches.groups.pageId,
      '7',
      'should retrieve 2nd Pathname parameters'
    )
  }

  testTemplateToPathname() {
    const urlTemplate = '/page/{category}/{pageId}'
    const pathname = UrlTemplateRegexp.pathnameFromUrlTemplate(urlTemplate, globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject({
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
