/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AnonComponent } from './anon.component';
import { FooterComponent } from './footer/footer.component';

import { RouterOutletStubComponent } from '../../testing';

describe('AnonComponent', () => {
  let component: AnonComponent;
  let fixture: ComponentFixture<AnonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AnonComponent,
        RouterOutletStubComponent,
        FooterComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
