import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WialonOrganisationComponent } from './wialon-organisation.component';

describe('WialonOrganisationComponent', () => {
  let component: WialonOrganisationComponent;
  let fixture: ComponentFixture<WialonOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WialonOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WialonOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
