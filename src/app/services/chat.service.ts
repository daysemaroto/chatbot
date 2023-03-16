import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
    private httpClient: HttpClient,
    private logger: NGXLogger,
  ) {
    this.chatUrl = '/api/chat';
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

  async reply(message: string): Promise<any> {
    try {
      const options = {
        headers: this.getReqHeaders(),

      };
      const body = {
        username: 'user',
        message: message,
      };
      const response = await this.httpClient.post<any>(this.chatUrl, body, options).toPromise();
      const botResponse = response.bot_response;
      const messageResponse = {
        text: botResponse,
        date: new Date(),
        reply: false,
        type: 'text',
        user: {
          name: 'Chatbot',
          avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
        },
      }
      return messageResponse;
    } catch (e) {
      this.handleError(e);
      const messageResponse = {
        text: 'Sorry, I am not able to understand your question. Please try again.',
        date: new Date(),
        reply: false,
        type: 'text',
        user: {
          name: 'Chatbot',
          avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
        },
      };
      return messageResponse;
    }
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'ServerError';
    this.logger.error(errMsg);
  }

}
