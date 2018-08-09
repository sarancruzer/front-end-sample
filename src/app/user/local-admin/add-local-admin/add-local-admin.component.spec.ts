import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocalAdminComponent } from './add-local-admin.component';

describe('AddLocalAdminComponent', () => {
  let component: AddLocalAdminComponent;
  let fixture: ComponentFixture<AddLocalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
