export interface HttpRequest<T=any>{
    body?:T
}

export interface HttpResponse<T=any>{
    body?:T
    error?:string
    status:number
}