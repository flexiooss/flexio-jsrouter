import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {deepKeyAssigner} from '@flexio-oss/js-generator-helpers'
import {RouteWithParams} from './src/js/Route/RouteWithParams'

/**
 * @property {RouteWithParams} globalFlexioImport.io.js_router.types.RouteWithParams
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.js_router.types.RouteWithParams', RouteWithParams)

export {RouterBuilder} from './src/js/RouterBuilder'
export {TypeCheck} from './src/js/TypeCheck'
export {RouteException} from './src/js/Route/RouteException'
