import { ElementRef } from '@angular/core';

import { LangDirective } from './lang.directive';
import { LangService } from './../services';

describe('LangDirective', () => {

  let elementRef: ElementRef;
  let langService: LangService;
  let directive: LangDirective;

  beforeEach(() => {
    elementRef = new ElementRef({});
    langService = new LangService();
    directive = new LangDirective(elementRef, langService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
