import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

export interface ErrorHandled {
  isOffLine: boolean;
  userFacingMsg: string;
  error: HttpErrorResponse;
}

@Injectable({
  providedIn: 'root',
})
export class ChatShowcaseService {
  private chatUrl: string;

  constructor(
    // private httpClient: HttpClient,
    private logger: NGXLogger,
  ) {
    this.chatUrl = 'http://localhost:3000/api/'
  }

  /**
   * Get http headers for httpClient request.
   * @return HttpHeaders with current API access_token .
   */
  getReqHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  reply(message: string): any {
    // return message;
    const response = {
        text: 'Hello, I am a chatbot',
        date: new Date(),
        reply: false,
        type: 'text',
        user: {
            name: 'Chatbot',
            avatar: 'https://i.gifer.com/no.gif',
        },
    }
    return response;
    // return this.httpClient.post<any>(this.chatUrl, { message: message }, { headers: this.getReqHeaders() })
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'ServerError';
    this.logger.log(errMsg);
  }

}
