import {PathnameBuilder} from './Pathname'
import {Hash} from './Hash'
import {SearchParams} from './SearchParams'

export class PartialUrl {
  constructor() {
    /**
     *
     * @type {Pathname}
     * @private
     */
    this.__pathname = new PathnameBuilder().build()
    /**
     *
     * @type {Hash}
     * @private
     */
    this.__hash = new Hash()
    /**
     *
     * @type {SearchParams}
     * @private
     */
    this.__searchParams = new SearchParams()
  }

  /**
   *
   * @return {Pathname}
   */
  get pathname() {
    return this.__pathname
  }

  /**
   *
   * @return {Hash}
   */
  get hash() {
    return this.__hash
  }

  /**
   *
   * @return {SearchParams}
   */
  get searchParams() {
    return this.__searchParams
  }

  /**
   *
   * @param {string} pathname
   * @return {PartialUrl}
   */
  withPathname(pathname) {
    this.__pathname = new PathnameBuilder()
      .value(pathname)
      .build()
    return this
  }

  /**
   *
   * @param {string} hash
   * @return {PartialUrl}
   */
  withHash(hash) {
    this.__hash = new Hash(hash)
    return this
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   * @return {PartialUrl}
   */
  withSearchParam(key, value) {
    this.__searchParams.value.set(key, value)
    return this
  }
}
