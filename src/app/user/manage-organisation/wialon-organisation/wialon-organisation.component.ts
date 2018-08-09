import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NotificationService, OrganisationService, SessionService, WialonService, WindowRefService, LangService } from '../../../shared';
import { Organisation } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'nb-wialon-organisation',
  templateUrl: './wialon-organisation.component.html',
  styleUrls: ['./wialon-organisation.component.css']
})
export class WialonOrganisationComponent implements OnInit {

  organisation: Organisation[];
  
  items:any;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";

  @Output() integratedNew: EventEmitter<String>;

  wialonAccessToken: String;

  isBusy: Boolean;

  private window: Window;

  id: number;

  constructor( private _service: OrganisationService,
    private _router: Router,
    private notificationService: NotificationService,
    private organisationService: OrganisationService,
    private sessionService: SessionService,
    private wialonService: WialonService,
    private windowRef: WindowRefService,
    private lang: LangService
  ) { 
    
    this.q = "";
    this.window = windowRef.nativeWindow;

    this.integratedNew = new EventEmitter<String>();

    this.isBusy = false;

    if (this.sessionService.getWialonToken()) {
      this.wialonAccessToken = this.sessionService.getWialonToken();
    }

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

  createOrganisation(){
    this._router.navigate(['/me/add-organisation']);
  }

  edit(data){
    this._router.navigate(['/me/edit-organisation',data.id])
  }


  
  integrate(data) {

    console.log(data);

    if(data.wialon_token != null){
      alert("already integrated");
      return false;
    }

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

      this.wialonAccessToken = token;

      this.storeToken(token);

      localStorage.setItem('wialon_token',token);     

    } catch (error) {
      this.notificationService.notifyError(this.lang.get('err_wialon_access_token'));
    }
  }

  private storeToken(token: string) {
    this.isBusy = true;
    this.organisationService.updateWialonAccessTokenNew(token,this.id)
      .subscribe(
        response => {
          this.isBusy = false;
          if (this.sessionService.getWialonToken()) {
            //this.sessionService.getWialonToken() = token;
            this.sessionService.setWialonToken(token);
          }
         // this.loginToken(token);
          this.notificationService.notifySuccess(this.lang.get('msg_wialon_token_stored'));
          this.integratedNew.emit(token);
        },
        error => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_storing_wialon_token'));
        }
      )
    ;
  }

  private loginToken(token: string) {

    // if (!this.sessionService.getOrganisation()) {
    //   return this.notificationService.notifyError('An unexpected error occurred! Please try again.');
    // }
  // const token = this.sessionService.getOrganisation().wialon_token;
    this.wialonService.loginToken(token)
      .then(response => {
        this.isBusy = false;
        this.notificationService.notifySuccess('Login to WorldTrack was successful.');        
      })
      .catch(error => {
        this.isBusy = false;
      });
  }


}
