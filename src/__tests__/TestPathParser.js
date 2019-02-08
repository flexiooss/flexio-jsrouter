/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {UrlParser} from '../PathParser'

const assert = require('assert')

/**
 * @extends TestCase
 */
export class TestPathParser extends TestCase {
  testShouldMatch() {
    const path = '/page/bobo/7/'
    const parser = new UrlParser(path)
    const matches = parser.parseWith('^/page/(?<pageName>[\\-_\\w]*)/?(?<pageID>[\\d]*)?/?$')

    assert.strictEqual(
      matches.groups.pageName,
      'bobo',
      'should retrieve first url parameters'
    )
    assert.strictEqual(
      matches.groups.pageID,
      '7',
      'should retrieve 2nd url parameters'
    )
  }
}

runTest(TestPathParser)
