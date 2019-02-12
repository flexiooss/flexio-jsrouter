export class SearchParams {
  constructor() {
    /**
     *
     * @type {Map<string, string>}
     * @private
     */
    this.__value = new Map()
  }

  /**
   *
   * @return {Map<string, string>}
   */
  get value() {
    return this.__value
  }
}
