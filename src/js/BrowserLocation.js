export class BrowserLocation {
  constructor() {
    this.__location = window.location
  }

  /**
   *
   * @return {Location}
   */
  get location() {
    return this.__location
  }
}
