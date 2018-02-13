// import {
//   assert,
//   isString
// } from 'flexio-jshelpers'

/**
 *
 * @class QueryParser
 * @description
 *
 */

class QueryParser {
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
}

export {
  QueryParser
}
