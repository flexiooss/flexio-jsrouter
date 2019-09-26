/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {UrlTemplateRegexp} from '../js/TemplateUrl/UrlTemplateRegexp'
import {Pathname} from '../js/URL/Pathname'

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
    const urlTemplate = 'page/{category}/{pageId}'
    const pathname = UrlTemplateRegexp.pathnameFromUrlTemplate(urlTemplate, {category: 'bobo', pageId: 7})
    console.log(pathname)

    const expectedPathname = new Pathname('page/bobo/7')

    assert.deepStrictEqual(
      pathname,
      expectedPathname,
      'should retrieve Pathname with parameters'
    )
  }
}

runTest(TestUrlTemplateRegexpTest)
