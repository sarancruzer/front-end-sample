import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLocalAdminComponent } from './manage-local-admin.component';

describe('ManageLocalAdminComponent', () => {
  let component: ManageLocalAdminComponent;
  let fixture: ComponentFixture<ManageLocalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLocalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLocalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
