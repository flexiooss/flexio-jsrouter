/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {RegexpBuilder} from '../TemplateUrl/RegexpBuilder'

const assert = require('assert')

/**
 * @extends TestCase
 */
export class TestRegexpBuilder extends TestCase {
  testTemplateToRegexp() {
    const urlTemplate = '/page/{category}/{pageId}'
    console.log('ici')
    const re = RegexpBuilder.fromUrlTemplate(urlTemplate)
    const url = '/page/bobo/7/'
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
}

runTest(TestRegexpBuilder)
