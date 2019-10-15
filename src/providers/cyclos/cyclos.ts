import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Request, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Config } from '../../config/config';
import { Session } from '../../lib/models/session';
import { Constant } from '../../constant';
import { Credential } from '../../lib/credential';

@Injectable()
export class CyclosProvider {

  public static session: Session;
  protected headers: Headers;
  protected resource: string;

  constructor(protected http: Http) { this.http = http; }

  protected fetch(
    resource: string,
    method: string = "GET",
    params: {} = null,
    headers?: Headers,
    responseType: ResponseContentType = ResponseContentType.Json) {

    let body: {} = null;
    let url = Config.endpoints.cyclos + resource;

    if (method != "GET")
      body = params;
    else {
      if (params) {
        Object.keys(params).forEach((key) => {
          url += '?' + key + '=' + params[key]
        })
      }
      //url += ''
    }

    //this.prepareHeaderSession(CyclosProvider.session);

    if (!headers) {
      headers = this.headers;
    }

    let reqOptArg: RequestOptionsArgs = {
      method: method,
      url: url,
      headers: headers,
      body: body,
      responseType: responseType
    };

    let reqOpt: RequestOptions = new RequestOptions(reqOptArg);

    return this.http.request( new Request(reqOpt) );
  }

  protected displayErrorConnectingServer() { alert("Veuillez verifier votre connection");  }

  protected prepareHeaderSession(session: Session) {
    if (session) {
      let headers: Headers = new Headers();
      headers.append('Session-Token', session.sessionToken);
      this.headers = headers;
    }
  }

  protected manageError(error) {
    let eBody = error.json();
    console.error(error);
    switch (error.status) {
      case 401:
        switch (eBody.code) {
          case 'missingAuthorization':
            alert(eBody.code)
            break;
          case '':
            alert(eBody.code)
            break;
        }
        break;
      case 403:
        if (eBody.code == 'inaccessibleChannel')
          alert(Constant.error_inaccessibleChannel);
      case 500:
        if (eBody.code == 'insufficientBalance')
          alert(eBody.code)
    }
  }

  private  accessControl(headers: Headers) {
    headers.append('Access-Control-Allow-Origin', '*');
    return headers
  }

  public  tokenHeader(headers: Headers,token: string) {
    let head: Headers = this.accessControl(headers)
    head.append("Session-Token",token)
    return head
  }

  public  authorizationHeader(headers:Headers,credential: Credential) {
    let head: Headers = this.accessControl(headers)
    head.append('Authorization', 'Basic ' + credential.getHash());
    return head
  }

  protected  defaultRequestOptionArgs(headers : Headers) :RequestOptionsArgs {
    let reqOptArg: RequestOptionsArgs = {
      responseType:ResponseContentType.Json,
      headers: headers
    };
    return reqOptArg
  }
  
}
