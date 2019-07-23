/* global runTest */
import {TestCase} from 'code-altimeter-js'

class perfTest extends TestCase {
  setUp() {
    this.__a = []
    for (let i = 0; i < 100000; i++) {
      this.__a.push([i, 'string_' + i])
    }
    this._t = []
  }

  testArrayForLoop() {
    const timeIn = new Date().getTime()
    const l = this.__a.length
    for (let i = 0; i < l; i++) {
      // console.log(this.__a[i])
      if (this.__a[i][1] === 'string_99998') {
        this._t.push(this.__a[i][1])
        break
      }
    }
    const timeOut = new Date().getTime()
    console.log('testArrayForLoop')
    console.log(timeOut - timeIn)
    console.log(this._t.length)
  }

  testMapForeachLoop() {
    const map = new Map(this.__a)
    const timeIn = new Date().getTime()
    var founded = false
    map.forEach((v) => {
      if (founded === false && v === 'string_99998') {
        this._t.push(v)
        founded = true
      }
    })
    const timeOut = new Date().getTime()
    console.log('testMapForeachLoop')
    console.log(timeOut - timeIn)
    console.log(this._t.length)
  }

  testMapForOfLoop() {
    const map = new Map(this.__a)

    const timeIn = new Date().getTime()
    const mapEntries = map.entries()
    for (const v of mapEntries) {
      if (v[1] === 'string_99998') {
        this._t.push(v[1])
      }
    }
    const timeOut = new Date().getTime()
    console.log('testMapForOfLoop')
    console.log(timeOut - timeIn)
    console.log(this._t.length)
  }
  testMapForOfLoopWithoutEntries() {
    const map = new Map(this.__a)

    const mapEntries = map.entries()
    const timeIn = new Date().getTime()
    for (const v of mapEntries) {
      if (v[1] === 'string_99998') {
        this._t.push(v[1])
      }
    }
    const timeOut = new Date().getTime()
    console.log('testMapForOfLoopWithoutEntries')
    console.log(timeOut - timeIn)
    console.log(this._t.length)
  }
}
runTest(perfTest)
