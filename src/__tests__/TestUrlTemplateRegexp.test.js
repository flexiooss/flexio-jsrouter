/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {UrlTemplateRegexp} from '../TemplateUrl/UrlTemplateRegexp'
import {nextTick} from 'q'
import {PathName} from '../URL/PathName'

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
      'should retrieve first pathname parameters'
    )
    assert.strictEqual(
      matches.groups.pageId,
      '7',
      'should retrieve 2nd pathname parameters'
    )
  }

  testTemplateToPathname() {
    const urlTemplate = 'page/{category}/{pageId}'
    const pathname = UrlTemplateRegexp.PathnameFromUrlTemplate(urlTemplate, {category: 'bobo', pageId: 7})
    const expectedPathname = new PathName('page/bobo/7')

    assert.deepStrictEqual(
      pathname,
      expectedPathname,
      'should retrieve pathname with parameters'
    )
  }
}

runTest(TestUrlTemplateRegexpTest)
