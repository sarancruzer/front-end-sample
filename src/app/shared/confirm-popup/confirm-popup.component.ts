import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
/* ,
  changeDetection: ChangeDetectionStrategy.OnPush */
@Component({
  selector: 'nb-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {

  @Input() title: string;

  @Input() message: string;

  @Output() onConfirm: EventEmitter<void>;

  @Output() onCancel: EventEmitter<void>;

  private modal: any;

  constructor() {
        
    this.onConfirm = new EventEmitter<void>(true);
    this.onCancel = new EventEmitter<void>(true);
  }

  ngOnInit() {    
    const modal = $('#confirmPopup');
    if (modal) {
      this.modal = (<any>modal);
      this.modal.appendTo('body');
    }
  }

  
  //ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    //this.ngOnInit()
  //}

  show() {
    
    if (!this.modal) {
      return;
    }
    console.log(this.title);
    console.log(this.message);
    this.modal.modal({
      show: true,
      backdrop: 'static'
    });
  

  }

  hide() {
    if (!this.modal) {
      return;
    }

    this.modal.modal('hide');
    
  }

  confirm() {
    this.onConfirm.emit();
    this.hide();
  }

  cancel() {
    this.onCancel.emit();
    this.hide();
  }
}
