/**
 *
 * @class QueryParser
 *
 */
class QueryParser {
  searchQueryParam(href, hash, param) {
    const vars = {}
    href
      .replace(hash, '')
      .replace(
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
