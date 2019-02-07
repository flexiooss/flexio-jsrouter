/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {UrlTemplateRegexp} from '../TemplateUrl/UrlTemplateRegexp'

const assert = require('assert')

/**
 * @extends TestCase
 */
export class TestUrlTemplateRegexp extends TestCase {
  testTemplateToRegexp() {
    const urlTemplate = 'page/{category}/{pageId}'
    const re = UrlTemplateRegexp.regexpFromUrlTemplate(urlTemplate)
    const url = 'page/bobo/7/'
    const matches = re.exec(url)

    assert.strictEqual(
      matches.groups.category,
      'bobo',
      'should retrieve first url parameters'
    )
    assert.strictEqual(
      matches.groups.pageId,
      '7',
      'should retrieve 2nd url parameters'
    )
  }

  testTemplateToUrl() {
    const urlTemplate = 'page/{category}/{pageId}'
    const url = UrlTemplateRegexp.UrlFromUrlTemplate(urlTemplate, {category: 'bobo', pageId: 7})
    const expectedUrl = 'page/bobo/7'

    assert.strictEqual(
      url,
      expectedUrl,
      'should retrieve url with parameters'
    )
  }
}

runTest(TestUrlTemplateRegexp)
