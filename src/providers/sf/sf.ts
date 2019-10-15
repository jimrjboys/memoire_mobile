import { Http, RequestOptions, Request, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SfProvider {

  protected url: string;

	constructor(protected http: Http) {}

  protected fetch(endpoint: string, body: any = null, method: string = 'GET', headers: Headers = new Headers()) : Observable<any>{
    return this.request(this.url + endpoint, body, method, headers)
  }

  protected request(url: string, body: any = null, method: string = 'GET', headers: Headers = new Headers()) : Observable<any>{
    let _body = new FormData()
    if (body) {
      Object.keys(body).forEach((value) => {
        _body.append(value, body[value])
      })
    }
    return this.http
    .request(new Request(new RequestOptions({
      method: method,
      url: url,
      body: _body,
      headers: headers
    })))
  }

}
