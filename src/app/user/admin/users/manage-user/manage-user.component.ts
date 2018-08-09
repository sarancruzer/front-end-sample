import { UsersService } from './../../../../shared/services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../../models';
import { NotificationService, LangService } from '../../../../shared';
import { Router } from '@angular/router';
import { ConfirmPopupComponent } from '../../../../shared/confirm-popup/confirm-popup.component';

@Component({
  selector: 'nb-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  isBusy: boolean;

  user: User[];
  delUser: any = [];
  
  items:any;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";

  @ViewChild(ConfirmPopupComponent)
  private confirmPopupComponent: ConfirmPopupComponent;

  deleteDialogTitle: string;

  deleteConfirmationMsg: string;

  uploadActionText: string;
  
  constructor( private _service: UsersService,
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

  addUser(){
    this._router.navigate(['/me/admin/add-user']);
  }

  edit(data){
    this._router.navigate(['/me/admin/edit-user',data.id])
  }

  delete(user){

    this.delUser = user;
    setTimeout(() => {
      this.deleteDialogTitle = this.lang.get('ttl_delete_confirm');
      this.deleteConfirmationMsg = this.lang.get('msg_delete_confirm');
      this.uploadActionText = this.lang.get('users_csv');
  });  
    
    this.confirmPopupComponent.show(this.deleteDialogTitle,this.deleteConfirmationMsg);

  }

  onDeletionConfirmed() {
    this._service.delete(this.delUser,this.delUser.id).subscribe(
      data => {
        const index: number = this.items.indexOf(this.delUser);
        if (index > -1) { 
          this.items.splice(index, 1);
        }
      },
      err => {
        this.notificationService.notifyError(this.lang.get('err_failed_deleting_user'));
      }
    );
  }


}

