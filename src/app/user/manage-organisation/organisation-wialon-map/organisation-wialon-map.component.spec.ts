/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { LeafletService, SessionService, WialonService, NotificationService } from '../../../shared';
import { WialonMapComponent } from '../../admin/wialon-integration/wialon-map/wialon-map.component';
import { SessionServiceStub, WialonServiceStub, LeafletServiceStub } from 'testing';


describe('WialonMapComponent', () => {
  let component: WialonMapComponent;
  let fixture: ComponentFixture<WialonMapComponent>;

  let leafletServiceStub = new LeafletServiceStub();
  let wialonServiceStub = new WialonServiceStub();
  let sessionServiceStub = new SessionServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WialonMapComponent ],
      providers: [
        {provide: LeafletService, useValue: leafletServiceStub},
        {provide: SessionService, useValue: sessionServiceStub},
        {provide: WialonService, useValue: wialonServiceStub},
        NotificationService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WialonMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
