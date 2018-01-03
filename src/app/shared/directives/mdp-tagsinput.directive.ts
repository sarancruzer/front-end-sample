import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '.tagsinput'
})
export class MdpTagsinputDirective {

  element: any;

  constructor(el: ElementRef) {
    setTimeout(() => {
      this.element = (<any>$(el.nativeElement)).tagsinput();
    });
  }

}
