import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {PathnameValidator} from '../URL/PathnameValidator'
import {TypeCheck} from '@flexio-oss/flex-types'
import {assertType, TypeCheck as PrimitiveTypeCheck} from '@flexio-oss/assert'


const START_RE = '^/?'
const PARAMETER_RE = '[^/]+'
const PARAMETER_TEMPLATE_RE_IN = '\{'
const PARAMETER_TEMPLATE_RE_OUT = '\}'
const PARAMETER_TEMPLATE_RE = PARAMETER_TEMPLATE_RE_IN + '(' + PARAMETER_RE + ')' + PARAMETER_TEMPLATE_RE_OUT

/**
 *
 * @type {Map<string, RegExp>}
 * @private
 */
const __memoizeRegexp = new Map()


export class UrlTemplateRegexp {

  /**
   *
   * @param {RouteCompiled} routeCompiled
   * @param {ObjectValue} routeParameter
   * @return {Pathname}
   * @static
   */
  static pathnameFromUrlTemplate(routeCompiled, routeParameter) {
    return new this().__templateToPathname(routeCompiled, routeParameter)
  }

  /**
   * @param {string} urlTemplate
   * @return {FlexRegExp}
   */
  static flexRegexpFromUrlTemplate(urlTemplate) {
    return new this().__templateToRegexp(urlTemplate)

  }

  /**
   *
   * @param {string} urlTemplate
   * @return {FlexRegExp}
   * @private
   */
  __templateToRegexp(urlTemplate) {

    const re = this.__getCompiledRegexp(PARAMETER_TEMPLATE_RE)
    let matches
    let stringRe = urlTemplate
    let namedGroups = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray()

    do {
      matches = re.exec(urlTemplate)

      if (matches) {

        stringRe = stringRe.replace(
          this.__getCompiledRegexp(this.__searchTemplateParam(matches[1])),
          this.__group()
        )
        namedGroups.push(matches[1])
      }

    } while (matches)

    return new globalFlexioImport.io.flexio.extended_flex_types.FlexRegExpBuilder()
      .value(new RegExp(this.__addBeginRegexp(this.__addTraillingSlashesRegex(stringRe))))
      .namedGroups(namedGroups)
      .build()

  }

  /**
   *
   * @param {string} stringRegexp
   * @param {boolean} resetIndex
   * @return {RegExp}
   * @private
   */
  __getCompiledRegexp(stringRegexp, resetIndex = true) {

    if (!__memoizeRegexp.has(stringRegexp)) {
      __memoizeRegexp.set(
        stringRegexp,
        new RegExp(stringRegexp, 'gi')
      )
    }

    const re = __memoizeRegexp.get(stringRegexp)

    if (resetIndex === true) {
      re.lastIndex = 0
    }

    return re
  }

  /**
   *
   * @param {string} name
   * @return {string}
   * @private
   */
  __searchTemplateParam(name) {
    return PARAMETER_TEMPLATE_RE_IN + name + PARAMETER_TEMPLATE_RE_OUT
  }

  /**
   *
   * @param {string} name
   * @return {string}
   * @private
   */
  __namedGroup(name) {
    return '(?<' + name + '>' + PARAMETER_RE + ')'
  }

  /**
   *
   * @return {string}
   * @private
   */
  __group() {
    return '(' + PARAMETER_RE + ')'
  }

  /**
   *
   * @param {string} stringRe
   * @return {string}
   * @private
   */
  __addBeginRegexp(stringRe) {
    return START_RE + stringRe
  }

  /**
   *
   * @param {string} stringRe
   * @return {string}
   * @private
   */
  __addTraillingSlashesRegex(stringRe) {
    return stringRe + '/?$'
  }

  /**
   *
   * @param {RouteCompiled} routeCompiled
   * @param {ObjectValue} routeParameter
   * @return {Pathname}
   */
  __templateToPathname(routeCompiled, routeParameter) {
    assertType(routeCompiled instanceof globalFlexioImport.io.flexio.js_router.types.RouteCompiled, 'should be a RouteCompiled')
    TypeCheck.assertIsObjectValue(routeParameter)

    let pathname = routeCompiled.urlTemplate()

    for (const param of routeCompiled.regexp().namedGroups()) {
      pathname = pathname.replace(
        this.__getCompiledRegexp(this.__searchTemplateParam(param)),
        this.__getValueByKey(param, routeParameter)
      )
    }

    const pathnameInst = new globalFlexioImport.io.flexio.js_router.types
      .PathnameBuilder()
      .value(pathname)
      .build()

    new PathnameValidator().isValid(pathnameInst)
    return pathnameInst
  }

  /**
   *
   * @param {string} key
   * @param {ObjectValue} obj
   * @return {string}
   * @private
   */
  __getValueByKey(key, obj) {
    return obj.stringValue(key)
  }
}
