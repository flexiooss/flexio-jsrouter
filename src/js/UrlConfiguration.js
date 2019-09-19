import {isString, isNull, assertType} from '@flexio-oss/assert'

export class UrlConfiguration {
  /**
   *
   * @param {?string} protocol
   * @param {?string} hostname
   * @param {?string} port
   */
  constructor(protocol = null, hostname = null, port = null) {
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
    return `${this.__hostname}${this.__port !== null ? ':' + this.__port : ''}`
  }

  /**
   *
   * @return {string}
   */
  origin() {
    return `${this.__protocol}://${this.host()}`
  }
}
