/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {Router} from '../Router'
import {RoutesHandler} from '../RoutesHandler'

const assert = require('assert')

/**
 * @extends TestCase
 */
export class TestRouter extends TestCase {
  testAddRoute() {
    const router = new Router(new RoutesHandler())
    assert(false, 'ça pète')
  }
}

runTest(new TestRouter())
