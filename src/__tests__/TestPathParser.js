/* global runTest */
import {TestCase} from 'code-altimeter-js'

const assert = require('assert')

/**
 * @extends TestCase
 */
export class TestPathParser extends TestCase {
  testTemplateToRegexp() {
    const template = '/page/{category}/{pageId}'
    const reBuilder = new RegexpBuilder()
    const re = reBuilder.templateToRegexp(template)
    const url = '/page/bobo/7/'
    const matches = re.exec(url)

    // const matches = parser.parsePath('^/page/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$')

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
}

runTest(TestPathParser)
