import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nb-single-value-stats',
  templateUrl: './single-value-stats.component.html',
  styleUrls: ['./single-value-stats.component.css']
})
export class SingleValueStatsComponent implements OnInit {

  @Input() headerBackgroundColor: string;

  @Input() headerIcon: string;

  @Input() category: string;

  @Input() value: string;

  @Input() footerIcon: string;

  @Input() footerText: string;

  constructor() {
    this.headerBackgroundColor = 'blue';
    this.headerIcon = 'info_outline';
  }

  ngOnInit() {
    // this.isBusy = true;
  }

  hasFooter() {
    return this.footerIcon || this.footerText;
  }

}
