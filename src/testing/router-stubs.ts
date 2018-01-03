import { Observable } from 'rxjs';
import { 
    Component,
    Directive,
    Input 
} from '@angular/core';

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Directive({selector: '[routerLinkActive]'})
export class RouterLinkActiveStubDirective { }

export class ActivatedRouteStub  {
    public firstChild: Object = {
        data: Observable.create((subscriber) => {})
    };
}

export class RouterStub {
    public events: Observable<any> = Observable.create((subscriber) => {});
}
