import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    this.onConfirm = new EventEmitter<void>();
    this.onCancel = new EventEmitter<void>();
  }

  ngOnInit() {
    const modal = $('#confirmPopup');
    if (modal) {
      this.modal = (<any>modal);
      this.modal.appendTo('body');
    }
  }

  show() {
    if (!this.modal) {
      return;
    }

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
