import { Directive, ElementRef, OnInit } from '@angular/core';

import { LangService } from './../services';

@Directive({
  selector: '[nbLang]'
})
export class LangDirective implements OnInit {

  constructor(
    public element: ElementRef,
    public lang: LangService
  ) { }

  ngOnInit() {
    const element = this.element.nativeElement;
    for (let i = 0; i < element.children.length; i++) {
      const id = element.children[i].getAttribute('id');
      const value = element.children[i].innerHTML;

      if (!value || !value.length) {
        setTimeout(() => {
          this.lang.set(id, element.children[i].innerHTML);
        });

        continue;
      }

      this.lang.set(id, value);
    }
  }

}
