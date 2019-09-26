import {isString, isNull, assertType} from '@flexio-oss/assert'

export class UrlConfiguration {
  /**
   *
   * @param {?string} protocol
   * @param {?string} hostname
   * @param {?string} port
   */
  constructor(protocol, hostname, port) {
    assertType(
      isString(protocol) || isNull(protocol),
      'UrlConfiguration `protocol` argument should be a string or null'
    )
    /**
     *
     * @type {?string}
     * @private
     */
    this.__protocol = protocol

    assertType(
      isString(hostname) || isNull(hostname),
      'UrlConfiguration `hostname` argument should be a string or null'
    )
    /**
     *
     * @type {?string}
     * @private
     */
    this.__hostname = hostname

    assertType(
      isString(port) || isNull(port),
      'UrlConfiguration `port` argument should be a string or null'
    )
    /**
     *
     * @type {?string}
     * @private
     */
    this.__port = port
  }

  /**
   *
   * @return {?string}
   */
  get protocol() {
    return this.__protocol
  }

  /**
   *
   * @return {?string}
   */
  get hostname() {
    return this.__hostname
  }

  /**
   *
   * @return {?string}
   */
  get port() {
    return this.__port
  }

  /**
   *
   * @return {string}
   */
  host() {
    return `${this.__hostname}${(this.__port !== null || this.__port !== '') ? ':' + this.__port : ''}`
  }

  /**
   *
   * @return {string}
   */
  origin() {
    return `${this.__protocol}://${this.host()}`
  }
}

export class UrlConfigurationBuilder {
  constructor() {
    this.__protocol = null
    this.__hostname = null
    this.__port = null
  }

  /**
   *
   * @param {?string} value
   * @return {UrlConfigurationBuilder}
   */
  protocol(value) {
    this.__protocol = value
    return this
  }

  /**
   *
   * @param {string} value
   * @return {UrlConfigurationBuilder}
   */
  hostname(value) {
    this.__hostname = value
    return this
  }

  /**
   *
   * @param {string} value
   * @return {UrlConfigurationBuilder}
   */
  port(value) {
    this.__port = value
    return this
  }

  /**
   *
   * @param {Object} jsonObject
   * @return {UrlConfigurationBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new UrlConfigurationBuilder()
    if (jsonObject['protocol'] !== undefined && jsonObject['protocol'] !== null) {
      builder.protocol(jsonObject['protocol'])
    }
    if (jsonObject['hostname'] !== undefined && jsonObject['hostname'] !== null) {
      builder.hostname(jsonObject['hostname'])
    }
    if (jsonObject['port'] !== undefined && jsonObject['port'] !== null && jsonObject['port'] !== '') {
      builder.port(jsonObject['port'])
    }
    return builder
  }

  /**
   *
   * @param {Location} location
   * @return {UrlConfigurationBuilder}
   */
  static fromLocation(location) {
    return UrlConfigurationBuilder.fromObject(location)
  }

  /**
   *
   * @return {UrlConfiguration}
   */
  build() {
    return new UrlConfiguration(this.__protocol, this.__hostname, this.__port)
  }
}
