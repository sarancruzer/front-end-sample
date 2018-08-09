import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService, OrganisationService, SessionService, WialonService, WindowRefService, LangService } from '../../../shared';


@Component({
  selector: 'nb-organisation-wialon-integrator',
  templateUrl: './organisation-wialon-integrator.component.html',
  styleUrls: ['./organisation-wialon-integrator.component.css']
})
export class OrganisationWialonIntegratorComponent implements OnInit {

  @Output() integrated: EventEmitter<String>;

  wialonAccessToken: String;

  isBusy: Boolean;

  private window: Window;

  
  items:any;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";

  id: number;


  constructor(
    private notificationService: NotificationService,
    private organisationService: OrganisationService,
    private sessionService: SessionService,
    private wialonService: WialonService,
    private windowRef: WindowRefService,
    private lang: LangService,
    private _router: Router
  ) {
    this.window = windowRef.nativeWindow;

    this.integrated = new EventEmitter<String>();

    this.isBusy = false;

    // if (this.sessionService.getOrganisation()) {
    //   this.wialonAccessToken = this.sessionService.getOrganisation().wialon_token;
    // }


    this.q = "";

    if (localStorage.getItem('wialontoken')) {
      this.wialonAccessToken = localStorage.getItem('wialontoken');
    }


  }

  ngOnInit() {
    this.init(1);
    
   
  }


  integrate(data) {

    console.log(data);

    if(data.wialon_token != null){
      alert("already integrated");
      return false;
    }

    localStorage.setItem('wialontoken','');
    this.wialonAccessToken = localStorage.getItem('wialontoken');

    this.id = data.id;

    const url = this.wialonService.getLoginUrl();

    this.window.addEventListener('message', event => this.tokenReceived(event));

    this.window.open(
      url.toString(),
      '_blank',
      'width=760, height=500, top=30, left=50');
  }

  private tokenReceived(event: any) {
    if (this.wialonAccessToken) {
      return;
    }

    try {
      const msg: string = <string>event.data;
      if (msg.indexOf('access_token=') === -1) {
        return;
      }

      const token = msg.replace('access_token=', '');
      if (!token.length) {
        return;
      }

      console.log("token");
      console.log(token);


      this.wialonAccessToken = token;

      this.storeToken(token);
    } catch (error) {
      this.notificationService.notifyError(this.lang.get('err_wialon_access_token'));
    }
  }

  private storeToken(token: string) {
    this.isBusy = true;
    this.organisationService.updateWialonAccessTokenNew(token,this.id)
      .subscribe(
        response => {

          console.log("storeToken");
          console.log(token);
    
          this.isBusy = false;
          // if (this.sessionService.getOrganisation()) {
          //   this.sessionService.getOrganisation().wialon_token = token;
          // }

          localStorage.setItem('wialontoken',token);

          this.notificationService.notifySuccess(this.lang.get('msg_wialon_token_stored'));
          this.integrated.emit(token);
        },
        error => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_storing_wialon_token'));
        }
      )
    ;
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
    this.organisationService.list(page,params).subscribe(
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

  createOrganisation(){
    this._router.navigate(['/me/add-organisation']);
  }

  edit(data){
    this._router.navigate(['/me/edit-organisation',data.id])
  }



}
