/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { WialonIntegratorComponent } from '../../admin/wialon-integration/wialon-integrator/wialon-integrator.component';
import { OrganisationServiceStub, WialonServiceStub, SessionServiceStub, WindowRefServiceStub } from 'testing';
import { NotificationService, OrganisationService, SessionService, WialonService, WindowRefService, LangService } from '../../../shared';



describe('WialonIntegratorComponent', () => {
  let component: WialonIntegratorComponent;
  let fixture: ComponentFixture<WialonIntegratorComponent>;

  const organisationServiceStub = new OrganisationServiceStub();
  const wialonServiceStub = new WialonServiceStub();
  const sessionServiceStub = new SessionServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WialonIntegratorComponent ],
      providers: [
        NotificationService,
        {provide: OrganisationService, useValue: organisationServiceStub},
        {provide: SessionService, useValue: sessionServiceStub},
        {provide: WialonService, useValue: wialonServiceStub},
        {provide: WindowRefService, useClass: WindowRefServiceStub},
        LangService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WialonIntegratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
