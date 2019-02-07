export class RouteNotFoundException extends Error {
  constructor(url, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(
        this,
        RouteNotFoundException
      )
    }

    this.url = url
  }

  toString() {
    return this.message + ' : ' + this.url
  }
}
