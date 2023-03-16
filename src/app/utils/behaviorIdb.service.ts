import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class BehaviorIdbService {

  constructor(private dbService: NgxIndexedDBService,
              private logger: NGXLogger,
  ) {
  }

  public async getMessages(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.dbService.getAll('messages').subscribe(
          messages => {
            this.logger.log('messages',messages);
            resolve(messages);
          }, error => {
            this.logger.error(error);
          }
        );
      });
    } catch (e) {
          this.logger.error(e);
    }
  }

  async addMessage(message: any): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.dbService.add('messages', message).subscribe(
          message => {
            this.logger.log('messages',message);
            resolve(message);
          }, error => {
            this.logger.error(error);
          }
        );
      });
    } catch (e) {
      this.handleError(e);
    }
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'ServerError';
    this.logger.error(errMsg);
  }
}