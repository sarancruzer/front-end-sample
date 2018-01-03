import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable()
export class WindowRefService {

  constructor() { }

  get nativeWindow(): any {
    return getWindow();
  }
}
