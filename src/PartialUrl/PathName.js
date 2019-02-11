export class PathName {
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
