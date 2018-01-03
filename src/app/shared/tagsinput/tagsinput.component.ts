import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

import { MdpTagsinputDirective } from './../directives';
import { Tag } from './../../models';

@Component({
  selector: 'nb-tagsinput',
  templateUrl: './tagsinput.component.html',
  styleUrls: ['./tagsinput.component.css']
})
export class TagsinputComponent {

  @Input() tags: Tag[];

  @Input() placeholder: string;

  @Output() updated: EventEmitter<Tag[]>;

  @ViewChild(MdpTagsinputDirective) input: MdpTagsinputDirective;

  constructor() {
    this.tags = [];
    this.placeholder = 'add a tag';
    this.updated = new EventEmitter<Tag[]>();
  }

  getValues() {
    return this.tags.map(tag => tag.value);
  }

  save() {
    if (!this.input || !this.input.element) {
      return;
    }

    const elem = this.input.element[0];
    this.reconcile(elem.items());
    this.updated.emit(this.tags);
  }

  private reconcile(tags: string[]) {
    // remove deleted tags
    this.tags = this.tags.filter(tag => {
      return tags.indexOf(tag.value) !== -1;
    });

    // add new tags
    tags.forEach(tag => {
      for (let i = 0; i < this.tags.length; i++) {
        let element = this.tags[i];
        if (element.value === tag) {
          return;
        }
      }

      this.tags.push({value: tag});
    });
  }

}
