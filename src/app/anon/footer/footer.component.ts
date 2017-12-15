import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nb-anon-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
