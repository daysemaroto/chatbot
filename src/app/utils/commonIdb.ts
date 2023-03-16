import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig  = {
  name: 'chatbot',
  version: 1,
  objectStoresMeta: [{
    store: 'messages',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'text', keypath: 'text', options: { unique: false } },
      { name: 'date', keypath: 'date', options: { unique: false } },
      { name: 'reply', keypath: 'reply', options: { unique: false } },
      { name: 'type', keypath: 'type', options: { unique: false } },
      { name: 'user', keypath: 'user', options: { unique: false } },
    ]
  }]
};
