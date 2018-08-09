import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  authenticated: any;
  username: any;
  
  constructor(private _router: Router){
    //  this._router.navigate(['/login']); 
    this.authenticated = JSON.parse(localStorage.getItem("authentication"));
    this.username = localStorage.getItem("name");   
    console.log(this._router.url);
    
    }   
  
    ngOnInit() {
      console.log("this.authenticated");
      console.log(this.authenticated);
      if(!this.authenticated){
          this._router.navigate(['/']); 
      }
  
    }
    
}
