import { Http, Request, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../../config/config';

@Injectable()
export class UpdateProvider {

  constructor(private http: Http) {
  }

  public check(version: number) {
  	return new Promise((resolve) => {
	  	this.request(`${Config.endpoints.update.url}?version=${version}`)
	  	.subscribe((response) => {
	  		resolve(response.json())
	  	})
  	})
  }

  protected request(url: string, body: any = null, method: string = 'GET') : Observable<any>{
    return this.http
    .request(new Request(new RequestOptions({
      method: method,
      url: url,
      body: body,
      headers: new Headers()
    })))
  }

}
