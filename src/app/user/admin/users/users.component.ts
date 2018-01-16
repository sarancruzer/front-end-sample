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

  constructor(
    private usersService: UsersService,
    private uploadService: UploadService,
    private notificationService: NotificationService,
    private lang: LangService,
    private cd: ChangeDetectorRef
  ) {
    this.users = [];
    this.editorToggler = false;
    this.isBusy = false;
  }

  getUsers() {
    this.isBusy = true;
    this.usersListSubscription = this.usersService.collection
      .subscribe(
        data => {
          this.isBusy = false;
          this.users = data;

          if (!this.table && this.users.length > 0) {
            this.buildTable();
          } else if (this.table) {
            // make DataTable register new vehicles
            // by making it to "rerender" the rows generated by Angular2
            setTimeout(() => {
              const tbody = this.table.table().body();
              this.table
                .clear()
                .rows.add(jQuery(tbody).children('tr'))
                .draw()
              ;
            });

            this.notificationService.notifyInfo(this.lang.get('msg_users_list_expanded'));
          }
        },
        err => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_failed_fetching_users'));
        }
      )
    ;
    this.usersService.fetch();
  }

  buildTable() {
    const table = $('#users-datatable');
    if (!table) {
      const msg = this.lang.get('err_failed_finding_datatable');
      return this.notificationService.notifyError(msg);
    }

    const settings: Object = {
      pagingType: 'full_numbers',
      retrieve: true,
      order: [[1, 'asc']],
      columnDefs: [
        { targets: [0, 2, 3, 6], sortable: false },
        { targets: [6], searchable: false }
      ]
    };

    setTimeout(() => {
      this.table = table.DataTable(<DataTables.Settings>settings);

      // fetch more vehicles on page length change event
      table.on('length.dt', () => this.fetchMore());

      // fetch more vehicles on page change event
      table.on('page.dt', () => this.fetchMore());
    });
  }

  ngOnInit() {
    this.getUsers();    
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
        this.usersService.users = [];
        this.isBusy = false;
        const msg = this.lang.get('msg_csv_file_uploaded');
        this.notificationService.notifySuccess(msg, true);
        this.usersService.reset();      
        setTimeout(() => {
                          this.getUsers();
                        }, 5000);

      },
      err => {
        this.isBusy = false;
        this.notificationService.notifyError(this.lang.get('err_failed_uploading_csv_file'));
      }
    );
  }

  onDeletionConfirmed() {
    this.usersService.delete(this.user).subscribe(
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

  private fetchMore() {
    if (this.usersService.hasMore()) {
      this.usersService.fetch();
    }
  }

}
