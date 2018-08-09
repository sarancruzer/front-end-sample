import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocalAdminComponent } from './edit-local-admin.component';

describe('EditLocalAdminComponent', () => {
  let component: EditLocalAdminComponent;
  let fixture: ComponentFixture<EditLocalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
