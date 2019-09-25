import {assertType, isNull, isString} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {FlexUrl, URLExtendedBuilder} from '@flexio-oss/extended-flex-types'

class Pathname {

  /**
   * @param {string} value
   * @private
   */
  constructor(value) {
    this._value = value
    deepFreezeSeal(this)
  }

  /**
   * @returns {string}
   */
  value() {
    return this._value
  }

  /**
   * @param {string} value
   */
  withValue(value) {
    let builder = PathnameBuilder.from(this)
    builder.value(value)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._value !== null) {
      jsonObject['value'] = this._value
    }
    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }
}

export {Pathname}

class PathnameBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
  }

  /**
   * @param {string} value
   * @returns {PathnameBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assertType(isString(value), 'value should be a string')
    }
    this._value = value
    return this
  }

  /**
   * @returns {Pathname}
   */
  build() {
    return new Pathname(this._value)
  }

  /**
   * @param {object} jsonObject
   * @returns {PathnameBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new PathnameBuilder()
    if (jsonObject['value'] !== undefined && jsonObject['value'] !== null) {
      builder.value(jsonObject['value'])
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {PathnameBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {Pathname} instance
   * @returns {PathnameBuilder}
   */
  static from(instance) {
    let builder = new PathnameBuilder()
    builder.value(instance.value())
    return builder
  }

  /**
   * @param {typeof URL} url
   * @returns {PathnameBuilder}
   */
  static fromURL(url) {
    if (!isNull(url)) {
      assertType(url instanceof URL, 'value should be a URL')
    }
    let builder = new PathnameBuilder()
    builder.value(url.pathname)
    return builder
  }

  /**
   * @param {FlexUrl} url
   * @returns {PathnameBuilder}
   */
  static fromFlexUrl(url) {
    if (!isNull(url)) {
      assertType(url instanceof FlexUrl, 'value should be a FlexUrl')
    }
    return PathnameBuilder.fromURL(
      URLExtendedBuilder.fromFlexUrl(url)
    )
  }
}

export {PathnameBuilder}
