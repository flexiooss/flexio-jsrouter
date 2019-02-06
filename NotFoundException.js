export class NotFoundException extends Error {
  constructor(url, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(
        this,
        NotFoundException
      )
    }

    this.url = url
  }

  toString() {
    return this.message + ' : ' + this.url
  }
}
