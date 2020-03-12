# js-router
Simple service for handling route

##### Instantiate and register a route

```javascript
import {RouterBuilder, UrlConfiguration} from '@flexio-oss/js-router'

const myRouter = RouterBuilder.build(
  new UrlConfiguration(
    'https',
    'localhost',
    '8080'
  )
)
  .addRoute(
    this.router.routeBuilder()
      .build(
        'resource.byPageName',
        'resource/{pageName}'
      )
  )

```

##### Get route with parameters from a pathname url
```javascript

myRouter.routeByPathname(
  new URL(
    'resource/old-news?with=that&and=this#42', 
    'https://localhost:8080'
  ).pathname
)


//  =>  RouteWithParams {
//       route:
//        Route {
//         name: 'resource.byPageName',
//         urlTemplate: 'resource/{pageName}' 
//        },
//        params: { pageName: 'old-news' }
//      }   


```

##### Get url from route name and parameters
```javascript

const myUrl = myRouter.urlByRouteName(
  'resource.byPageName',
  {pageName: 'old-news'}
  )


// => https://localhost:8080/resource/old-news

```
