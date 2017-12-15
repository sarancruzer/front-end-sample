import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '.datetimepicker'
})
export class MdpDatetimePickerDirective implements OnChanges {

  @Input() dpMin: Date;
  @Input() dpMax: Date;
  @Input() dpDefault: Date;
  @Input() dpValue: Date;

  private picker: any;

  constructor(
    public model: NgModel,
    private el: ElementRef
  ) {
    setTimeout(() => {
      const elem = $(el.nativeElement);
      this.picker = (<any>elem).datetimepicker({
        collapse: false,
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        },
        format: 'D-MM-YYYY HH:mm',
        useCurrent: !this.dpDefault,
        defaultDate: this.dpDefault ? this.dpDefault : false,
        minDate: this.dpMin ? this.dpMin : false,
        maxDate: this.dpMax ? this.dpMax : false
      });

      elem.on('dp.change', (e) => {
        if (!this.model) {
          return;
        }

        this.model.update.emit((<any>e).date._d);
      });
    });
  }

  ngOnChanges() {
    if (this.picker) {
      if (this.dpMin) {
        this.picker.data('DateTimePicker').minDate(this.dpMin);
      }

      if (this.dpDefault) {
        this.picker.data('DateTimePicker').defaultDate(this.dpDefault);
      }

      if (this.dpValue) {
        this.picker.data('DateTimePicker').date(this.dpValue);
      }

      if (this.dpMax) {
        this.picker.data('DateTimePicker').maxDate(this.dpMax);
      }
    }
  }

}
