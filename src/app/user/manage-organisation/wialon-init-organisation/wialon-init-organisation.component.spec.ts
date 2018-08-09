import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WialonInitOrganisationComponent } from './wialon-init-organisation.component';

describe('WialonInitOrganisationComponent', () => {
  let component: WialonInitOrganisationComponent;
  let fixture: ComponentFixture<WialonInitOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WialonInitOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WialonInitOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
