import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'nb-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  languages: Object[];
  currentUrl:string;

  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    private router:ActivatedRoute
    
    
  ) {
    this.languages = [
      { code: 'da', label: 'Dansk' },
      { code: 'en', label: 'English' },
      // TODO uncomment below, when translations are ready
      // { code: 'es', label: 'Español' },
      // { code: 'et', label: 'Eesti' },
      // { code: 'ro', label: 'Română' },
    ];
  }

  ngOnInit() {
    // console.log(window.location.hash)
    this.currentUrl = window.location.hash;    
  }

}
