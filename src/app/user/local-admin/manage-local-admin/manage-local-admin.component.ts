import { Router } from '@angular/router';
import { LocalAdmin } from './../../../models/local-admin';
import { Observable, Subscription } from 'rxjs/Rx';

import { Component, OnInit} from '@angular/core';

import {
  NotificationService,
  LangService,
} from './../../../shared/services';
import { LocalAdminService } from '../../../shared/services/local-admin.service';


@Component({
  selector: 'nb-manage-local-admin',
  templateUrl: './manage-local-admin.component.html',
  styleUrls: ['./manage-local-admin.component.css'],
  providers: [LocalAdminService]
})
export class ManageLocalAdminComponent implements OnInit {

  isBusy: boolean;

  localAdmin: LocalAdmin[];
  
  items:any;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";

  constructor( private _service: LocalAdminService,
    private notificationService: NotificationService,
    private lang: LangService,
    private _router: Router) { 
    
    this.q = "";

    }

    ngOnInit() {
      this.init(1);
     
    }
 
    sort(property){
     this.isDesc = !this.isDesc; //change the direction    
     this.column = property;
     this.orderby = this.isDesc ? 'desc' : 'asc'
     this.init(this.currentPage);
   };

  
   init(page) {
    console.log(page,this.q);
    let params = {column:this.column,orderby:this.orderby,q:this.q};
    this.isBusy = true;
    this._service.list(page,params).subscribe(
        res => {
          this.isBusy = false;
          this.items = res['result']['info']['data'];
          this.totalPage = res['result']['info']['total'];
          this.currentPage = res['result']['info']['current_page'];
          this.lastPage = res['result']['info']['last_page'];
  
           this.pages = [];
           for(var i=1;i<=this.lastPage;i++) {          
             this.pages.push(i);
           }    
           
           console.log(this.pages);

        },
        err => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_failed_fetching_users'));
        }
      )
    ;
  }

  addLocalAdmin(){
    this._router.navigate(['/me/admin/add-local-admin']);
  }

  edit(data){
    this._router.navigate(['/me/admin/edit-local-admin',data.id])
  }

}
