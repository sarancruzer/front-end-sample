import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '.selectpicker'
})
export class MdpBootstrapSelectDirective {

  constructor(el: ElementRef) {
    setTimeout(() =>  {
      (<any>$(el.nativeElement)).selectpicker();
    });
  }

}
