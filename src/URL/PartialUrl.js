import {PathName} from './PathName'
import {Hash} from './Hash'
import {SearchParams} from './SearchParams'

export class PartialUrl {
  constructor() {
    /**
     *
     * @type {PathName}
     * @private
     */
    this.__pathname = new PathName()
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
   * @return {PathName}
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
   * @param {string} pathName
   * @return {PartialUrl}
   */
  withPathName(pathName) {
    this.__pathname = new PathName(pathName)
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
