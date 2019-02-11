export class Hash {
  constructor(value = '') {
    /**
     *
     * @type {string}
     * @private
     */
    this.__value = value
  }
  get value() {
    return this.__value
  }
}
