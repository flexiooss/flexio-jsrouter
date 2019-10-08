Route:
  name: string
  urlTemplate: string
  parent: string

RouteWithParams:
  route: $Route
  params: object

UrlConfiguration:
  protocol: string
  hostname: string
  port: string
  pathname: string

Pathname:
  value: string

RouteCompiled:
  route: $Route
  regexp: object
