export const ALREADY_EXISTS = 'ALREADY_EXISTS'
export const NOT_FOUND = 'NOT_FOUND'

export class RouteException extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
    this.name = this.constructor.name
    this.code = null
  }

  /**
   *
   * @param {string} code
   * @return {RouteException}
   */
  setCode(code) {
    this.code = code
    return this
  }

  /**
   * @param {string} name
   * @return {RouteException}
   */
  static ALREADY_EXISTS(name) {
    return new RouteException('route already registered with name : ' + name)
      .setCode(ALREADY_EXISTS)
  }

  /**
   * @param {string} param
   * @return {RouteException}
   */
  static NOT_FOUND(param) {
    return new RouteException('route not found with : ' + param)
      .setCode(NOT_FOUND)
  }

  toString() {
    return `${this.code} - ${this.name} : ${this.message} `
  }
}
