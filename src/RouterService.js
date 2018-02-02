import {
  RoutesHandler
} from './RoutesHandler'
import {
  PathParser
} from './PathParser'

class RouterService {
  constructor() {
    this._routesHandler = new RoutesHandler()
    this._parser = new PathParser()
    this._location = window.location
  }
  searchQueryParam(param) {
    var vars = {}
    window.location.href.replace(window.location.hash, '').replace(
      /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
      function(m, key, value) { // callback
        vars[key] = value !== undefined ? value : ''
      }
    )

    if (param) {
      return vars[param] ? vars[param] : null
    }
    return vars
  }
  setRoute() {
    this._location = window.location
  }
  hash() {
    return this._location.hash.substr(1)
  }
  path() {
    return this._location.pathname
    // return this._location.pathname.substr(1)
  }

  setRoutes(routes) {
    this._routesHandler.setRoutes(routes)
  }

  route(key) {
    return this._routesHandler.route(key)
  }

  forEachRoutes(callback) {
    return this._routesHandler.forEachRoutes(callback)
  }

  routeUrl(routeName, params, queryParams, hash) {
    const path = this.route(routeName).path
    return this._parser.pathToUrl(path, params)
  }

  getRouteByPath() {
    console.log('getRouteByPath')
    console.log(this.path())

    var route = {}
    this._routesHandler.forEachRoutes((value, key, map) => {
      var matches = this._parser.parsePath(this.path(), value.path)
      if (matches) {
        route = this.route(key)
        if (matches.length > 1) {
          route.param = {}
          for (let i = 1; i < matches.length; i++) {
            route.param[i] = matches[i]
          }
        }
      }
    })
    console.log(route)
    return route
  }
}
export {
  RouterService
}
