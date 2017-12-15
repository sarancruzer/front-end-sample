import { Injectable } from '@angular/core';

@Injectable()
export class LangService {

  private messages: Object;

  constructor() {
    this.messages = new Object;
  }

  get(key: string): string {
    return this.messages[key];
  }

  set(key: string, value: string) {
    this.messages[key] = value;
  }

}
