import {assertType, isNull} from '@flexio-oss/assert'
import {URLExtendedBuilder} from '@flexio-oss/extended-flex-types'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {PathnameConstraints} from './PathnameConstraints'

export class PathnameBuilderFrom {

  /**
   * @param {URL} url
   * @returns {PathnameBuilder}
   */
  static URL(url) {
    if (!isNull(url)) {
      assertType(url instanceof URL, 'PathnameBuilderFrom:URL: `value` should be a URL')
    }
    let builder = new globalFlexioImport.io.flexio.js_router.types
      .PathnameBuilder()
    builder.value(PathnameConstraints.value(url.pathname))
    return builder
  }

  /**
   * @param {FlexUrl} url
   * @returns {PathnameBuilder}
   */
  static FlexUrl(url) {
    if (!isNull(url)) {
      assertType(url instanceof globalFlexioImport.io.flexio.extended_flex_types.FlexUrl, 'PathnameBuilderFrom:FlexUrl: `value` should be a FlexUrl')
    }

    return PathnameBuilderFrom
      .URL(
        URLExtendedBuilder
          .fromFlexUrl(url)
          .build()
      )
  }
}

