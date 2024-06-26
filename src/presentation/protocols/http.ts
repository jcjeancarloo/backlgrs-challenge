export interface HttpRequest {
  headers?: any
  params?: any
  query?: any
  body?: any
  locals?: any
  file?: any
}

export interface HttpResponse {
  statusCode: number
  body?: any
  locals?: any
}
