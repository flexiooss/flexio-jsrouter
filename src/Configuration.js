export class Configuration {
  /**
   *
   * @param {?string} protocol
   * @param {?string} hostname
   * @param {?string} port
   */
  constructor(protocol = null, hostname = null, port = null) {
    /**
     *
     * @type {?string}
     * @private
     */
    this.__protocol = protocol
    /**
     *
     * @type {?string}
     * @private
     */
    this.__hostname = hostname
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
    return `${this.__protocol}//${this.host()}`
  }
}
