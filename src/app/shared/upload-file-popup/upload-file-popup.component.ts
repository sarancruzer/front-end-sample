import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
 } from '@angular/core';

@Component({
  selector: 'nb-upload-file-popup',
  templateUrl: './upload-file-popup.component.html',
  styleUrls: ['./upload-file-popup.component.css']
})
export class UploadFilePopupComponent implements OnInit, OnChanges {

  @Input() visible: boolean;

  @Input() object: string;

  @Input() actionText: string;

  @Output() shown: EventEmitter<boolean>;

  @Output() hidden: EventEmitter<boolean>;

  @Output() upload: EventEmitter<string>;

  private modal: any;

  fileObj: any;

  constructor() {
    this.visible = false;
    this.shown = new EventEmitter<boolean>();
    this.hidden = new EventEmitter<boolean>();
    this.upload = new EventEmitter<string>();
  }

  ngOnInit() {
    const modal = jQuery('#uploadPopup');
    if (modal) {
      this.modal = (<any>modal);
      this.modal.appendTo('body');
      this.modal.on('shown.bs.modal', () => this.shown.emit(true));
      this.modal.on('hidden.bs.modal', () => this.hidden.emit(true));
    }
  }

  ngOnChanges() {
    if (this.visible) {
      this.show();
    } else {
      this.hide();
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

  uploadObject() {
    if (!this.fileObj) {
      return;
    }
    this.upload.emit(this.fileObj);
    this.hide();
  }

  onFileChange(event) {
    const files = event.srcElement.files;
    this.fileObj = files[0];
  }

}
