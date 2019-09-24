export class RouteException extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
    this.name = this.constructor.name
  }

  /**
   * @param {string} name
   * @return {RouteException}
   */
  static ALREADY_EXISTS(name) {
    return new RouteException('ALREADY_EXISTS : route already registered with name : ' + name)
  }

  /**
   * @param {string} param
   * @return {RouteException}
   */
  static NOT_FOUND(param) {
    return new RouteException('NOT_FOUND : route not found with : ' + param)
  }

  toString() {
    return `${this.name} : ${this.message} `
  }
}
