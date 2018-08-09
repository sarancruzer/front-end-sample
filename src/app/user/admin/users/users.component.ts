import { Observable, Subscription } from 'rxjs/Rx';

import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { User } from './../../../models';
import {
  SessionService,
  UsersService,
  NotificationService,
  UploadService,
  LangService,
} from './../../../shared/services';
import JsonToModelTransformers from '../../../utils/json.to.model';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ConfirmPopupComponent } from './../../../shared/confirm-popup/confirm-popup.component';

@Component({
  selector: 'nb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  isBusy: boolean;

  users: User[];

  user: User;

  editorToggler: boolean;

  uploadToggler: boolean;

  deleteDialogTitle: string;

  deleteConfirmationMsg: string;

  uploadActionText: string;

  private table: any;

  private usersListSubscription: Subscription;

  @ViewChild(ConfirmPopupComponent)
  private confirmPopupComponent: ConfirmPopupComponent;

  @ViewChild(UserEditorComponent)
  
  private userEditorComponent: UserEditorComponent;
  
  items:any;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";

  constructor(
    private _service: UsersService,
    private uploadService: UploadService,
    private notificationService: NotificationService,
    private lang: LangService,
    private cd: ChangeDetectorRef
  ) {
    this.users = [];
    this.editorToggler = false;
    this.isBusy = false;
    this.q = "";
  }


  
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

  ngOnInit() {
    this.init(1);    
  }

  ngOnDestroy() {
    if (this.usersListSubscription) {
      this.usersListSubscription.unsubscribe();
    }
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.deleteDialogTitle = this.lang.get('ttl_delete_confirm');
      this.deleteConfirmationMsg = this.lang.get('msg_delete_confirm');
      this.uploadActionText = this.lang.get('users_csv');
  });
  // this.cd.detectChanges();
  } 

  addUser() {
    this.userEditorComponent.setBTAsCreate();
    this.user = null;
    this.editorToggler = true;
  }

  editUser(user: User) {
    this.user = user;
    this.userEditorComponent.setBTAsUpdate();
    this.editorToggler = true;
  }

  deleteUser(user: User) {
    this.user = user;
    setTimeout(() => {
      this.deleteDialogTitle = this.lang.get('ttl_delete_confirm');
      this.deleteConfirmationMsg = this.lang.get('msg_delete_confirm');
      this.uploadActionText = this.lang.get('users_csv');
  });    
    this.confirmPopupComponent.show(this.deleteDialogTitle,this.deleteConfirmationMsg);
  }

   onEditorShown() {
    this.editorToggler = true;
  }

  onEditorHidden() {
    this.editorToggler = false;
  }

  onUploadPopupShown() {
    this.uploadToggler = true;
  }

  onUploadPopupHidden() {
    this.uploadToggler = false;
  }



  onUpdate(event) {
    let isUpdated: boolean;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userKey === event.userKey) {
        this.users[i] = event;
        isUpdated = true;
        break;
      }
    }

    if (!isUpdated) {
      this.users.push(event);
    }
  }

  onFileUpload(event: File) {
    this.isBusy = true;
    const fileObj = event;
    this.uploadService.uploadUsers(fileObj).subscribe(
      data => {
        this._service.users = [];
        this.isBusy = false;
        const msg = this.lang.get('msg_csv_file_uploaded');
        this.notificationService.notifySuccess(msg, true);
        this._service.reset();      
        setTimeout(() => {
                          this.init(1);
                        }, 5000);

      },
      err => {
        this.isBusy = false;
        this.notificationService.notifyError(this.lang.get('err_failed_uploading_csv_file'));
      }
    );
  }

  onDeletionConfirmed() {
    this._service.delete(this.user,this.user.id).subscribe(
      data => {
        const index: number = this.users.indexOf(this.user);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      },
      err => {
        this.notificationService.notifyError(this.lang.get('err_failed_deleting_user'));
      }
    );
  }

}
