import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleValueStatsComponent } from './single-value-stats.component';

describe('SingleValueStatsComponent', () => {
  let component: SingleValueStatsComponent;
  let fixture: ComponentFixture<SingleValueStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleValueStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValueStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
