export class BrowserLocation {
  constructor() {
    this._location = null
  }

  setRoute() {
    this._location = window.location
  }

  hash() {
    return this._location.hash.substr(1)
  }

  path() {
    return this._location.pathname
  }
}
